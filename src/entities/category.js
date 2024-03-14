export default function category({
    name,
    icon,
    color,
    userId,
    familyId
}) {
    return {
        getName: () => name,
        getIcon: () => icon,
        getColor: () => color,
        getUserId: () => userId,
        getFamilyId: () => familyId
    };
}
