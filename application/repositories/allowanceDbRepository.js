export default function allowanceRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const countAll = (params) => repository.countAll(params);
    const findById = (id) => repository.findById(id);
    const add = (allowance) => repository.add(allowance);
    const updateById = (id, allowance, fieldsToUpdate) => repository.updateById(id, allowance, fieldsToUpdate);
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
