import chore from '../../../src/entities/chore';

export default function addChore({
    description,
    rewardType,
    rewardValue,
    deadlineAt,
    completed,
    completedAt,
    childId,
    userId,
    familyId,
    choreRepository
}) {
    if (!description || !rewardType || !rewardValue || !deadlineAt || !childId || !userId || !familyId) {
        throw new Error('description, rewardType, rewardValue, deadlineAt, childId, userId and familyId fields cannot be empty');
    }

    const newChore = chore({
        description,
        rewardType,
        rewardValue,
        deadlineAt,
        completed,
        completedAt,
        childId,
        userId,
        familyId
    });

    return choreRepository.add(newChore);
}
