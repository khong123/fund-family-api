import family from '../../../src/entities/family';

export default function addFamily({
    name,
    members,
    parentId,
    familyRepository
}) {
    if (!members || !parentId) {
        throw new Error('members and parentId fields cannot be empty');
    }

    const newFamily = family({
        name,
        members,
        parentId
    });

    return familyRepository.add(newFamily);
}
