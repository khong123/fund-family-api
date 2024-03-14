import family from '../../../src/entities/family';

export default function updateById({
    id,
    name,
    members,
    familyRepository
}) {
    const updatedFamily = family({
        name,
        members
    });

    return familyRepository.findById(id).then((foundFamily) => {
        if (!foundFamily) {
            throw new Error('No family found');
        }
        return familyRepository.updateById(
            id,
            updatedFamily,
            ['name', 'members']
        );
    });
}
