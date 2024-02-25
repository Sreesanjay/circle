import nodemailer from 'nodemailer';
import { IMailOptions } from '../Interfaces';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sreesanjay7592sachu@gmail.com',
    pass: 'muujjvhhtmpekcqe'
  }
});
export const sendMail = (mailOptions: IMailOptions) => {
  transporter.sendMail(mailOptions).then(() => {

  }).catch(() => {
    throw new Error('Error sending email')
  });
}


