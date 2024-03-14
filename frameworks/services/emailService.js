import nodemailer from 'nodemailer';

import config from '../../config/config';

export default function emailService() {
    const transporter = nodemailer.createTransport({
        host: config.mailHost,
        port: config.mailPort,
        secure: true,
        auth: {
            user: config.mailUsername,
            pass: config.mailPassword
        }
    });

    const sendVerificationEmail = async (recipientEmail, verificationToken) => {
        const mailOptions = {
            from: config.mailUsername,
            to: recipientEmail,
            subject: 'Email Verification',
            html:
                '<p>Please click the following link to verify your email:</p>' +
                `<a href="${config.clientUrl}/api/v1/verify/${verificationToken}">Verify Email</a>`
        };

        await transporter.sendMail(mailOptions);
    };

    const sendInvitationEmail = async (parentEmail, recipientEmail, invitationToken) => {
        const mailOptions = {
            from: config.mailUsername,
            to: recipientEmail,
            subject: 'Invitation to Join Fund Family',
            html:
                `<p>You have been invited by ${parentEmail} to join the Fund Family. Click the link below to register and access the app:</p>` +
                `<a href="${config.clientUrl}/api/v1/register/${invitationToken}">Register & Access App</a>`
        };

        await transporter.sendMail(mailOptions);
    };

    return {
        sendVerificationEmail,
        sendInvitationEmail
    };
}
