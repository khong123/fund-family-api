import BudgetModel from '../models/budget';
import { omit } from '../../../../utils/utils';

export default function budgetRepositoryMongoDB() {
    const findAll = (params) =>
        BudgetModel.find(omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);

    const countAll = (params) =>
        BudgetModel.countDocuments(omit(params, 'page', 'perPage'));

    const findById = (id) => BudgetModel.findById(id);

    const add = (budgetEntity) => {
        const newBudget = new BudgetModel({
            budgetLimit: budgetEntity.getBudgetLimit(),
            categoryId: budgetEntity.getCategoryId(),
            userId: budgetEntity.getUserId(),
            familyId: budgetEntity.getFamilyId()
        });

        return newBudget.save();
    };

    const updateById = (id, budgetEntity, fieldsToUpdate) => {
        let updatedBudget = {};

        if (fieldsToUpdate.includes('budgetLimit')) {
            updatedBudget.budgetLimit = budgetEntity.getBudgetLimit();
        }
        if (fieldsToUpdate.includes('categoryId')) {
            updatedBudget.categoryId = budgetEntity.getCategoryId();
        }

        if (Object.keys(updatedBudget).length === 0) {
            return findById(id);
        }
        return BudgetModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedBudget },
            { new: true }
        );
    };

    const deleteById = (id) => BudgetModel.findByIdAndDelete(id);

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
