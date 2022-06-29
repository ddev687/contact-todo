import config from '../config';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport(config.smtp);
  transport
    .verify()
    .then(() => console.log('Connected to email server'))
    .catch(() => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));

const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = { from: config.from, to, subject, html };
  try {
    let result = await transport.sendMail(msg);
    console.log('Mail sent',result)
  } catch (err) {
    console.log(err);
  }
};

export {
  sendEmail
};
