import allowance from '../../../src/entities/allowance';

export default function addAllowance({
    amount,
    frequency,
    childId,
    userId,
    familyId,
    allowanceRepository
}) {
    if (!amount || !frequency || !childId || !userId || !familyId) {
        throw new Error('amount, frequency, childId, userId and familyId fields cannot be empty');
    }

    const newAllowance = allowance({
        amount,
        frequency,
        childId,
        userId,
        familyId
    });

    return allowanceRepository.add(newAllowance);
}
