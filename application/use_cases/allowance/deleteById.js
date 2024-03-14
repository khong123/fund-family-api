export default function deleteById({
    id,
    allowanceRepository
}) {
    return allowanceRepository.findById(id).then((allowance) => {
        if (!allowance) {
            throw new Error('No allowance found');
        }
        return allowanceRepository.deleteById(id);
    });
}
