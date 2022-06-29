import { create } from 'express-handlebars'
import Handlebars from 'handlebars'
import config from '../config';
import { sendEmail } from './send_email';
import path from 'path';

const hbs = create({
    handlebars: Handlebars
})

async function sendSignupEmail(
    fullName: string,
    email: string,
    subject: string,
    verifyToken: string
) {
    const filePath = path.join(process.cwd(), '/src/views/signup.handlebars');
    let html = await hbs.render(filePath, { fullName, email, verificationLink: `${config.appUrl}${config.emailVerificationUrl}${verifyToken}` })
    return await sendEmail(email, subject, html);
}

export {
    sendSignupEmail
}