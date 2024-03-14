export default function countAll({
    params,
    allowanceRepository
}) {
    return allowanceRepository.countAll(params);
}
