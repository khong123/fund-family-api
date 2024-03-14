export default function deleteById({
    id,
    verificationTokenRepository
}) {
    return verificationTokenRepository.findById(id).then((verificationToken) => {
        if (!verificationToken) {
            throw new Error('No verification token found');
        }
        return verificationTokenRepository.deleteById(id);
    });
}
