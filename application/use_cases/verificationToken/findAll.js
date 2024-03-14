export default function findAll({
    params,
    verificationTokenRepository
}) {
    return verificationTokenRepository.findAll(params);
}