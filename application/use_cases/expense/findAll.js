export default function findAll({
    params,
    expenseRepository
}) {
    return expenseRepository.findAll(params);
}
