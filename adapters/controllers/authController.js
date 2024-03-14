import login from '../../application/use_cases/auth/login';
import userAdd from '../../application/use_cases/user/add';
import userUpdateById from '../../application/use_cases/user/updateById';
import familyFindById from '../../application/use_cases/family/findById';
import familyAdd from '../../application/use_cases/family/add';
import familyUpdateById from '../../application/use_cases/family/updateById';
import verificationTokenFindAll from '../../application/use_cases/verificationToken/findAll';
import verificationTokenAdd from '../../application/use_cases/verificationToken/add';
import verificationTokenDeleteById from '../../application/use_cases/verificationToken/deleteById';
import { generateRandomString } from '../../utils/utils';

export default function authController(
    userDbRepositoryInterface,
    userDbRepositoryImpl,
    familyDbRepositoryInterface,
    familyDbRepositoryImpl,
    verificationTokenDbRepositoryInterface,
    verificationTokenDbRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
    emailServiceInterface,
    emailServiceImpl
) {
    const userDbRepository = userDbRepositoryInterface(userDbRepositoryImpl());
    const familyDbRepository = familyDbRepositoryInterface(familyDbRepositoryImpl());
    const verificationTokenDbRepository = verificationTokenDbRepositoryInterface(verificationTokenDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const emailService = emailServiceInterface(emailServiceImpl());

    const loginUser = (req, res, next) => {
        const { email, password } = req.body;

        login({
            email: email,
            password: password,
            userRepository: userDbRepository,
            authService: authService
        })
            .then((token) => res.json({ token }))
            .catch((err) => next(err));
    };

    const registerUser = (req, res, next) => {
        const { email, password, name, relationship, accountType, token } = req.body;
        const response = {};

        if (token) {
            // Register child using an invitation token sent via email by the parent
            var familyId = '';

            verificationTokenFindAll({
                params: { token: token },
                verificationTokenRepository: verificationTokenDbRepository
            })
                .then((verificationTokens) => {
                    if (!verificationTokens || verificationTokens.length === 0) {
                        throw new Error('No verification token found');
                    }
                    return verificationTokens[0];
                })
                .then((verificationToken) => {
                    familyId = verificationToken.familyId;

                    return verificationTokenDeleteById({
                        id: verificationToken._id,
                        verificationTokenRepository: verificationTokenDbRepository
                    });
                })
                .then((_) => {
                    return userAdd({
                        email: email,
                        password: password,
                        name: name,
                        relationship: relationship,
                        accountType: accountType,
                        families: [familyId],
                        userRepository: userDbRepository,
                        authService: authService
                    });
                })
                .then((user) => {
                    response.user = user;

                    return verificationTokenAdd({
                        token: generateRandomString(),
                        type: 'email_verification',
                        userId: user._id,
                        verificationTokenRepository: verificationTokenDbRepository
                    });
                })
                .then((verificationToken) => {
                    emailService.sendVerificationEmail(response.user.email, verificationToken.token);

                    return familyFindById({
                        id: familyId,
                        familyRepository: familyDbRepository
                    })
                })
                .then((family) => {
                    var members = family.members;

                    members.push(response.user._id);

                    familyUpdateById({
                        id: family._id,
                        members: members,
                        familyRepository: familyDbRepository
                    })

                    return res.json(response);
                })
                .catch((error) => next(error));
        } else {
            // Register parent and create a family account
            userAdd({
                email: email,
                password: password,
                name: name,
                relationship: relationship,
                accountType: accountType,
                userRepository: userDbRepository,
                authService: authService
            })
                .then((user) => {
                    response.user = user;

                    return verificationTokenAdd({
                        token: generateRandomString(),
                        type: 'email_verification',
                        userId: user._id,
                        verificationTokenRepository: verificationTokenDbRepository
                    });
                })
                .then((verificationToken) => {
                    emailService.sendVerificationEmail(response.user.email, verificationToken.token);

                    return familyAdd({
                        name: response.user.name,
                        members: [
                            response.user._id
                        ],
                        parentId: response.user._id,
                        familyRepository: familyDbRepository
                    })
                })
                .then((family) => {
                    var families = response.user.families;

                    families.push(family._id);

                    return userUpdateById({
                        id: response.user._id,
                        families: families,
                        userRepository: userDbRepository
                    });
                })
                .then((user) => {
                    response.user = user;

                    return res.json(response);
                })
                .catch((error) => next(error));
        }
    };

    const verifyEmail = (req, res, next) => {
        verificationTokenFindAll({
            params: { token: req.params.token },
            verificationTokenRepository: verificationTokenDbRepository
        })
            .then((verificationTokens) => {
                if (!verificationTokens || verificationTokens.length === 0) {
                    throw new Error('No verification token found');
                }
                return verificationTokens[0];
            })
            .then((verificationToken) => {
                return verificationTokenDeleteById({
                    id: verificationToken._id,
                    verificationTokenRepository: verificationTokenDbRepository
                });
            })
            .then((verificationToken) => {
                userUpdateById({
                    id: verificationToken.userId,
                    isVerified: true,
                    userRepository: userDbRepository
                });
                return res.send('Account activation complete. You can now log in.');
            })
            .catch((error) => next(error));
    };

    return {
        loginUser,
        registerUser,
        verifyEmail
    };
}
