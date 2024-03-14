export default function countAll({
    params,
    expenseRepository
}) {
    return expenseRepository.countAll(params);
}
