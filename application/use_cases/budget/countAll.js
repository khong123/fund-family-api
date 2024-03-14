export default function countAll({
    params,
    budgetRepository
}) {
    return budgetRepository.countAll(params);
}
