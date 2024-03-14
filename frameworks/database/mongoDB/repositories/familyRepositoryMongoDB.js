import FamilyModel from '../models/family';

export default function familyRepositoryMongoDB() {
    const findAll = (params) => FamilyModel.find(params);

    const findById = (id) => FamilyModel.findById(id);

    const add = (familyEntity) => {
        const newFamily = new FamilyModel({
            name: familyEntity.getName(),
            members: familyEntity.getMembers(),
            parentId: familyEntity.getParentId()
        });

        return newFamily.save();
    };

    const updateById = (id, familyEntity, fieldsToUpdate) => {
        let updatedFamily = {};

        if (fieldsToUpdate.includes('name')) {
            updatedFamily.name = familyEntity.getName();
        }
        if (fieldsToUpdate.includes('members')) {
            updatedFamily.members = familyEntity.getMembers();
        }

        if (Object.keys(updatedFamily).length === 0) {
            return findById(id);
        }
        return FamilyModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedFamily },
            { new: true }
        );
    };

    const deleteById = (id) => FamilyModel.findByIdAndDelete(id);

    return {
        findAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
