export default function expense({
    amount,
    description,
    recordedAt,
    categoryId,
    userId,
    familyId
}) {
    return {
        getAmount: () => amount,
        getDescription: () => description,
        getRecordedAt: () => recordedAt,
        getCategoryId: () => categoryId,
        getUserId: () => userId,
        getFamilyId: () => familyId
    };
}
