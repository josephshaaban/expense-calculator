const nodemailer = require("nodemailer");

const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "gmail";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER || "jad.niko921@gmail.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "comg fimj mzys bxhp";

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            service: EMAIL_SERVICE,
            port: EMAIL_PORT,
            // secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        });
        transporter.verify().then(console.log).catch(console.error);

        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;