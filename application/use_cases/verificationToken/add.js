import verificationToken from '../../../src/entities/verificationToken';

export default function addVerificationToken({
    token,
    type,
    userId,
    familyId,
    verificationTokenRepository
}) {
    if (!token || !type || !userId) {
        throw new Error('token, type and userId fields cannot be empty');
    }

    const newVerificationToken = verificationToken({
        token,
        type,
        userId,
        familyId
    });

    return verificationTokenRepository.add(newVerificationToken);
}
