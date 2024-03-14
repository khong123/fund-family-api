export default function findAll({
    params,
    allowanceRepository
}) {
    return allowanceRepository.findAll(params);
}
