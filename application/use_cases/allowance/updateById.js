import allowance from '../../../src/entities/allowance';

export default function updateById({
    id,
    amount,
    frequency,
    childId,
    allowanceRepository
}) {
    const updatedAllowance = allowance({
        amount,
        frequency,
        childId
    });

    return allowanceRepository.findById(id).then((foundAllowance) => {
        if (!foundAllowance) {
            throw new Error('No allowance found');
        }
        return allowanceRepository.updateById(
            id,
            updatedAllowance,
            ['amount', 'frequency', 'childId'],
        );
    });
}
