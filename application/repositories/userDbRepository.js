export default function userRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const findById = (id, populateFamilies) => repository.findById(id, populateFamilies);
    const add = (user) => repository.add(user);
    const updateById = (id, user, fieldsToUpdate) => repository.updateById(id, user, fieldsToUpdate);

    return {
        findAll,
        findById,
        add,
        updateById
    };
}
