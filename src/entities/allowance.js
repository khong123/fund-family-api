export default function allowance({
    amount,
    frequency,
    childId,
    userId,
    familyId
}) {
    return {
        getAmount: () => amount,
        getFrequency: () => frequency,
        getChildId: () => childId,
        getUserId: () => userId,
        getFamilyId: () => familyId
    };
}
