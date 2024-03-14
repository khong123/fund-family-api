export default function choreRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const countAll = (params) => repository.countAll(params);
    const findById = (id) => repository.findById(id);
    const add = (chore) => repository.add(chore);
    const updateById = (id, chore, fieldsToUpdate) => repository.updateById(id, chore, fieldsToUpdate);
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
