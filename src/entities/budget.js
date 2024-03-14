export default function budget({
    budgetLimit,
    categoryId,
    userId,
    familyId
}) {
    return {
        getBudgetLimit: () => budgetLimit,
        getCategoryId: () => categoryId,
        getUserId: () => userId,
        getFamilyId: () => familyId
    };
}
