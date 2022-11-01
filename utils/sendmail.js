import nodemailer from 'nodemailer'

export const sendEmail = async (options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.smtp_host,
        port: process.env.smtp_port,
        secure: false,
        auth: {
            user: process.env.mail_trap_user,
            pass: process.env.mail_trap_password,
        },
    });

    let message = {
        from: `${process.env.from_name} <${process.env.from_email}>`,
        to: options.email,
        subject: options.subject,
        text:options.message
    };

    const info = await transporter.sendMail(message);

    console.log('Email sent: %s', info.messageId);
}