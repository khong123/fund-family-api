export default function findById({
    id,
    choreRepository
}) {
    return choreRepository.findById(id);
}
