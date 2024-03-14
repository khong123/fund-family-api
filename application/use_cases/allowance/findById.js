export default function findById({
    id,
    allowanceRepository
}) {
    return allowanceRepository.findById(id);
}
