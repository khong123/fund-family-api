import ExpenseModel from '../models/expense';
import { omit } from '../../../../utils/utils';

export default function expenseRepositoryMongoDB() {
    const findAll = (params) =>
        ExpenseModel.find(omit(params, 'page', 'perPage'))
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);

    const countAll = (params) =>
        ExpenseModel.countDocuments(omit(params, 'page', 'perPage'));

    const findById = (id) => ExpenseModel.findById(id);

    const add = (expenseEntity) => {
        const newExpense = new ExpenseModel({
            amount: expenseEntity.getAmount(),
            description: expenseEntity.getDescription(),
            recordedAt: expenseEntity.getRecordedAt(),
            categoryId: expenseEntity.getCategoryId(),
            userId: expenseEntity.getUserId(),
            familyId: expenseEntity.getFamilyId()
        });

        return newExpense.save();
    };

    const updateById = (id, expenseEntity, fieldsToUpdate) => {
        let updatedExpense = {};

        if (fieldsToUpdate.includes('amount')) {
            updatedExpense.amount = expenseEntity.getAmount();
        }
        if (fieldsToUpdate.includes('description')) {
            updatedExpense.description = expenseEntity.getDescription();
        }
        if (fieldsToUpdate.includes('recordedAt')) {
            updatedExpense.recordedAt = expenseEntity.getRecordedAt();
        }
        if (fieldsToUpdate.includes('categoryId')) {
            updatedExpense.categoryId = expenseEntity.getCategoryId();
        }

        if (Object.keys(updatedExpense).length === 0) {
            return findById(id);
        }
        return ExpenseModel.findOneAndUpdate(
            { _id: id },
            { $set: updatedExpense },
            { new: true }
        );
    };

    const deleteById = (id) => ExpenseModel.findByIdAndDelete(id);

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
