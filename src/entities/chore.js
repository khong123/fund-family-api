export default function chore({
    description,
    rewardType,
    rewardValue,
    deadlineAt,
    completed,
    completedAt,
    childId,
    userId,
    familyId
}) {
    return {
        getDescription: () => description,
        getRewardType: () => rewardType,
        getRewardValue: () => rewardValue,
        getDeadlineAt: () => deadlineAt,
        getCompleted: () => completed,
        getCompletedAt: () => completedAt,
        getChildId: () => childId,
        getUserId: () => userId,
        getFamilyId: () => familyId
    };
}
