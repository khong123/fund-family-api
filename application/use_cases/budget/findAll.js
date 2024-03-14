export default function findAll({
    params,
    budgetRepository
}) {
    return budgetRepository.findAll(params);
}
