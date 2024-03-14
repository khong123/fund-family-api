export default function expenseRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const countAll = (params) => repository.countAll(params);
    const findById = (id) => repository.findById(id);
    const add = (expense) => repository.add(expense);
    const updateById = (id, expense, fieldsToUpdate) => repository.updateById(id, expense, fieldsToUpdate);
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
