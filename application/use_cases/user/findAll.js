export default function findAll({
    params,
    userRepository
}) {
    return userRepository.findAll(params);
}