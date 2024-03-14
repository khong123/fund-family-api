export default function deleteById({
    id,
    expenseRepository
}) {
    return expenseRepository.findById(id).then((expense) => {
        if (!expense) {
            throw new Error('No expense found');
        }
        return expenseRepository.deleteById(id);
    });
}
