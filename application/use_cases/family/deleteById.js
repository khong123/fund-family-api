export default function deleteById({
    id,
    familyRepository
}) {
    return familyRepository.findById(id).then((family) => {
        if (!family) {
            throw new Error('No family found');
        }
        return familyRepository.deleteById(id);
    });
}
