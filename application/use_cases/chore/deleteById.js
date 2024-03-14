export default function deleteById({
    id,
    choreRepository
}) {
    return choreRepository.findById(id).then((chore) => {
        if (!chore) {
            throw new Error('No chore found');
        }
        return choreRepository.deleteById(id);
    });
}
