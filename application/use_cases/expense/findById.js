export default function findById({
    id,
    expenseRepository
}) {
    return expenseRepository.findById(id);
}
