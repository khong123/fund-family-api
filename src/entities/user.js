export default function user({
    email,
    password,
    name,
    isVerified,
    relationship,
    accountType,
    families
}) {
    return {
        getEmail: () => email,
        getPassword: () => password,
        getName: () => name,
        getIsVerified: () => isVerified,
        getRelationship: () => relationship,
        getAccountType: () => accountType,
        getFamilies: () => families
    };
}
