export default function findAll({
    params,
    choreRepository
}) {
    return choreRepository.findAll(params);
}
