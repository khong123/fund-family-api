import expense from '../../../src/entities/expense';

export default function updateById({
    id,
    amount,
    description,
    recordedAt,
    categoryId,
    expenseRepository
}) {
    if (!amount || !description || !recordedAt) {
        throw new Error('amount, description and recordedAt fields are mandatory');
    }
    const updatedExpense = expense({
        amount,
        description,
        recordedAt,
        categoryId
    });

    return expenseRepository.findById(id).then((foundExpense) => {
        if (!foundExpense) {
            throw new Error('No expense found');
        }
        return expenseRepository.updateById(
            id,
            updatedExpense,
            ['amount', 'description', 'recordedAt', 'categoryId']
        );
    });
}
