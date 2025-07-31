const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: '"star"',
            to,
            subject,
            html
        });
        return { success: true };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
};

module.exports = sendEmail;
