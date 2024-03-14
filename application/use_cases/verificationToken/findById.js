export default function findById({
    id,
    verificationTokenRepository
}) {
    return verificationTokenRepository.findById(id);
}
