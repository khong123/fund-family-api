import category from '../../../src/entities/category';

export default function addCategory({
    name,
    icon,
    color,
    userId,
    familyId,
    categoryRepository
}) {
    if (!name || !userId || !familyId) {
        throw new Error('name, userId and familyId fields cannot be empty');
    }

    const newCategory = category({
        name,
        icon,
        color,
        userId,
        familyId
    });

    return categoryRepository.add(newCategory);
}
