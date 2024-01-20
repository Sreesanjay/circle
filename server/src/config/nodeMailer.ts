import nodemailer from 'nodemailer';
import { IMailOptions } from '../Interfaces';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sreesanjay7592sachu@gmail.com',
    pass: 'muujjvhhtmpekcqe'
  }
});
export const sendMail = (mailOptions:IMailOptions) => {
  transporter.sendMail(mailOptions).then(() => {
    console.log('Email sent successfully. Message ID:');

  }).catch((error) => {
    console.error('Error sending email:', error);
    throw new Error('Error sending email')
  });
}


