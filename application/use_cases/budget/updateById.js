import budget from '../../../src/entities/budget';

export default function updateById({
    id,
    budgetLimit,
    categoryId,
    budgetRepository
}) {
    const updatedBudget = budget({
        budgetLimit,
        categoryId
    });

    return budgetRepository.findById(id).then((foundBudget) => {
        if (!foundBudget) {
            throw new Error('No budget found');
        }
        return budgetRepository.updateById(
            id,
            updatedBudget,
            ['budgetLimit', 'categoryId'],
        );
    });
}
