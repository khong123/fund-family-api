export default function categoryRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const countAll = (params) => repository.countAll(params);
    const findById = (id) => repository.findById(id);
    const add = (category) => repository.add(category);
    const updateById = (id, category, fieldsToUpdate) => repository.updateById(id, category, fieldsToUpdate);
    const deleteById = (id) => repository.deleteById(id);

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
