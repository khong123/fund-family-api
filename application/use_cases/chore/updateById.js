import chore from '../../../src/entities/chore';

export default function updateById({
    id,
    description,
    rewardType,
    rewardValue,
    deadlineAt,
    completed,
    completedAt,
    childId,
    choreRepository
}) {
    const updatedChore = chore({
        description,
        rewardType,
        rewardValue,
        deadlineAt,
        completed,
        completedAt,
        childId
    });

    return choreRepository.findById(id).then((foundChore) => {
        if (!foundChore) {
            throw new Error('No chore found');
        }
        return choreRepository.updateById(
            id,
            updatedChore,
            ['description', 'rewardType', 'rewardValue', 'deadlineAt', 'completed', 'completedAt', 'childId']
        );
    });
}
