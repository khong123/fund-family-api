import CategoryModel from '../models/category';
import { omit } from '../../../../utils/utils';

export default function categoryRepositoryMongoDB() {
    const findAll = (params) =>
        CategoryModel.find(omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);

    const countAll = (params) =>
        CategoryModel.countDocuments(omit(params, 'page', 'perPage'));

    const findById = (id) => CategoryModel.findById(id);

    const add = (categoryEntity) => {
        const newCategory = new CategoryModel({
            name: categoryEntity.getName(),
            icon: categoryEntity.getIcon(),
            color: categoryEntity.getColor(),
            userId: categoryEntity.getUserId(),
            familyId: categoryEntity.getFamilyId()
        });

        return newCategory.save();
    };

    const updateById = (id, categoryEntity, fieldsToUpdate) => {
        let updatedCategory = {};

        if (fieldsToUpdate.includes('name')) {
            updatedCategory.name = categoryEntity.getName();
        }
        if (fieldsToUpdate.includes('icon')) {
            updatedCategory.icon = categoryEntity.getIcon();
        }
        if (fieldsToUpdate.includes('color')) {
            updatedCategory.color = categoryEntity.getColor();
        }

        if (Object.keys(updatedCategory).length === 0) {
            return findById(id);
        }
        return CategoryModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedCategory },
            { new: true }
        );
    };

    const deleteById = (id) => CategoryModel.findByIdAndDelete(id);

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
