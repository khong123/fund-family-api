export default function emailService(service) {
    const sendVerificationEmail = (recipientEmail, verificationToken) =>
        service.sendVerificationEmail(recipientEmail, verificationToken);

    const sendInvitationEmail = (parentEmail, recipientEmail, invitationToken) =>
        service.sendInvitationEmail(parentEmail, recipientEmail, invitationToken);

    return {
        sendVerificationEmail,
        sendInvitationEmail
    };
}