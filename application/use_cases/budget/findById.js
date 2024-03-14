export default function findById({
    id,
    budgetRepository
}) {
    return budgetRepository.findById(id);
}
