import UserModel from '../models/user';

export default function userRepositoryMongoDB() {
    const findAll = (params) => UserModel.find(params);

    const findById = (id, populateFamilies) => {
        let query = UserModel.findById(id).select('-password');
        if (populateFamilies) {
            query = query.populate('families');
        }
        return query.exec();
    };

    const add = (userEntity) => {
        const newUser = new UserModel({
            email: userEntity.getEmail(),
            password: userEntity.getPassword(),
            name: userEntity.getName(),
            relationship: userEntity.getRelationship(),
            accountType: userEntity.getAccountType(),
            families: userEntity.getFamilies()
        });

        return newUser.save();
    };

    const updateById = (id, userEntity, fieldsToUpdate) => {
        let updatedUser = {};

        if (fieldsToUpdate.includes('password')) {
            updatedUser.password = userEntity.getPassword();
        }
        if (fieldsToUpdate.includes('name')) {
            updatedUser.name = userEntity.getName();
        }
        if (fieldsToUpdate.includes('isVerified')) {
            updatedUser.isVerified = userEntity.getIsVerified();
        }
        if (fieldsToUpdate.includes('relationship')) {
            updatedUser.relationship = userEntity.getRelationship();
        }
        if (fieldsToUpdate.includes('accountType')) {
            updatedUser.accountType = userEntity.getAccountType();
        }
        if (fieldsToUpdate.includes('families')) {
            updatedUser.families = userEntity.getFamilies();
        }

        if (Object.keys(updatedUser).length === 0) {
            return findById(id);
        }
        return UserModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedUser },
            { new: true }
        );
    };

    return {
        findAll,
        findById,
        add,
        updateById
    };
}
