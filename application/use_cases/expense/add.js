import expense from '../../../src/entities/expense';

export default function addExpense({
    amount,
    description,
    recordedAt,
    categoryId,
    userId,
    familyId,
    expenseRepository
}) {
    if (!amount || !userId || !familyId) {
        throw new Error('amount, userId and familyId fields cannot be empty');
    }

    const newExpense = expense({
        amount,
        description,
        recordedAt,
        categoryId,
        userId,
        familyId
    });

    return expenseRepository.add(newExpense);
}
