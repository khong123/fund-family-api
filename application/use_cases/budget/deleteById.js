export default function deleteById({
    id,
    budgetRepository
}) {
    return budgetRepository.findById(id).then((budget) => {
        if (!budget) {
            throw new Error('No budget found');
        }
        return budgetRepository.deleteById(id);
    });
}
