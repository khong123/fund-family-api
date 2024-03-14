import userFindAll from '../../application/use_cases/user/findAll';
import userFindById from '../../application/use_cases/user/findById';
import userUpdateById from '../../application/use_cases/user/updateById';
import verificationTokenAdd from '../../application/use_cases/verificationToken/add';
import { generateRandomString } from '../../utils/utils';

export default function userController(
  userDbRepositoryInterface,
  userDbRepositoryImpl,
  verificationTokenDbRepositoryInterface,
  verificationTokenDbRepositoryImpl,
  emailServiceInterface,
  emailServiceImpl
) {
  const userDbRepository = userDbRepositoryInterface(userDbRepositoryImpl());
  const verificationTokenDbRepository = verificationTokenDbRepositoryInterface(verificationTokenDbRepositoryImpl());
  const emailService = emailServiceInterface(emailServiceImpl());

  const getMe = (req, res, next) => {
    const userId = req.user.id;

    userFindById({
      id: userId,
      populateFamilies: true,
      userRepository: userDbRepository
    })
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const updateMe = (req, res, next) => {
    const userId = req.user.id;
    const { name, relationship, accountType } = req.body;

    userUpdateById({
      id: userId,
      name: name,
      relationship: relationship,
      accountType: accountType,
      userRepository: userDbRepository
    })
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const inviteUser = (req, res, next) => {
    const userId = req.user.id;
    var userEmail = '';
    const { familyId, email } = req.body;

    userFindAll({
      params: { email: email },
      userRepository: userDbRepository
    })
      .then((users) => {
        if (users && users.length > 0) {
          throw new Error(`User with email: ${users[0].email} already exists`);
        };
        return userFindById({
          id: userId,
          userRepository: userDbRepository
        });
      })
      .then((user) => {
        userEmail = user.email;

        if (!user.families.includes(familyId)) {
          throw new Error('No family found');
        }

        return verificationTokenAdd({
          token: generateRandomString(),
          type: 'invite',
          userId: userId,
          familyId: familyId,
          verificationTokenRepository: verificationTokenDbRepository
        });
      })
      .then((verificationToken) => {
        emailService.sendInvitationEmail(userEmail, email, verificationToken.token);

        return res.json();
      })
      .catch((error) => next(error));
  };

  return {
    getMe,
    updateMe,
    inviteUser
  };
}