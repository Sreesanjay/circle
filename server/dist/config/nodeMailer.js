"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'sreesanjay7592sachu@gmail.com',
        pass: 'muujjvhhtmpekcqe'
    }
});
const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions).then(() => {
    }).catch(() => {
        throw new Error('Error sending email');
    });
};
exports.sendMail = sendMail;
