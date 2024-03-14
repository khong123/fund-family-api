export default function verificationToken({
    token,
    type,
    userId,
    familyId
}) {
    return {
        getToken: () => token,
        getType: () => type,
        getUserId: () => userId,
        getFamilyId: () => familyId
    };
}
