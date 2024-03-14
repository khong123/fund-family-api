export default function family({
    name,
    members,
    parentId
}) {
    return {
        getName: () => name,
        getMembers: () => members,
        getParentId: () => parentId
    };
}
