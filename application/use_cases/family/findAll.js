export default function findAll({
    params,
    familyRepository
}) {
    return familyRepository.findAll(params);
}
