import user from '../../../src/entities/user';

export default function addUser({
    email,
    password,
    name,
    relationship,
    accountType,
    families,
    userRepository,
    authService
}) {
    if (!email || !password) {
        throw new Error('email and password fields cannot be empty');
    }

    const newUser = user({
        email: email,
        password: authService.encryptPassword(password),
        name: name,
        relationship: relationship,
        accountType: accountType,
        families: families
    });

    return userRepository
        .findAll({ email })
        .then((userWithEmail) => {
            if (userWithEmail.length) {
                throw new Error(`User with email: ${email} already exists`);
            }
            return userRepository.add(newUser);
        });
}
