export default function findById({
    id,
    familyRepository
}) {
    return familyRepository.findById(id);
}
