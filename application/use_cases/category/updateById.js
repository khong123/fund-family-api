import category from '../../../src/entities/category';

export default function updateById({
    id,
    name,
    icon,
    color,
    categoryRepository
}) {
    const updatedCategory = category({
        name,
        icon,
        color
    });

    return categoryRepository.findById(id).then((foundCategory) => {
        if (!foundCategory) {
            throw new Error('No category found');
        }
        return categoryRepository.updateById(
            id,
            updatedCategory,
            ['name', 'icon', 'color']
        );
    });
}
