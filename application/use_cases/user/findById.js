export default function findById({
    id,
    populateFamilies,
    userRepository
}) {
    return userRepository.findById(id, populateFamilies);
}
