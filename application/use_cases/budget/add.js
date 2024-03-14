import budget from '../../../src/entities/budget';

export default function addBudget({
    budgetLimit,
    categoryId,
    userId,
    familyId,
    budgetRepository
}) {
    if (!budgetLimit || !userId || !familyId) {
        throw new Error('budgetLimit, userId and familyId fields cannot be empty');
    }

    const newBudget = budget({
        budgetLimit,
        categoryId,
        userId,
        familyId
    });

    return budgetRepository.add(newBudget);
}
