export default function verificationTokenRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const findById = (id) => repository.findById(id);
    const add = (token) => repository.add(token);
    const deleteById = (id) => repository.deleteById(id);

    return {
        findAll,
        findById,
        add,
        deleteById
    };
}
