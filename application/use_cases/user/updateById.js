import user from '../../../src/entities/user';

export default function updateById({
    id,
    password,
    name,
    isVerified,
    relationship,
    accountType,
    families,
    userRepository
}) {
    const updatedUser = user({
        password,
        name,
        isVerified,
        relationship,
        accountType,
        families
    });

    return userRepository.findById(id).then((foundUser) => {
        if (!foundUser) {
            throw new Error('No user found');
        }
        return userRepository.updateById(
            id,
            updatedUser,
            ['password', 'name', 'isVerified', 'relationship', 'accountType', 'families']
        );
    });
}
