import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { upgradePlanGreetingTemplate } from '../lib/templates/upgradePlan.js';
dotenv.config()

const transporter = nodemailer.createTransport({
  //@ts-expect-error fix it later overload
    host: process.env.MAIL_HOST!,
    port: process.env.MAIL_PORT!,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  //send email function
export const sendEmail = async ( email: string, subject: string) => {
  const mail = await transporter.sendMail({
      from: '"Pumpkin" <support@dryink.space>',
      to: email,
      subject: subject,
      html: upgradePlanGreetingTemplate(),
  })
  return mail;
}