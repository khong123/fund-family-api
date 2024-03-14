export default function countAll({
    params,
    choreRepository
}) {
    return choreRepository.countAll(params);
}
