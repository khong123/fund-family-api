export default function familyRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const findById = (id) => repository.findById(id);
    const add = (family) => repository.add(family);
    const updateById = (id, family, fieldsToUpdate) => repository.updateById(id, family, fieldsToUpdate);
    const deleteById = (id) => repository.deleteById(id);

    return {
        findAll,
        findById,
        add,
        updateById,
        deleteById
    };
}
