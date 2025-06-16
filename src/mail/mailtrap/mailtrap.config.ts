import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { from } from 'rxjs';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io', // Usa el host que proporcionaste
      port: 2525, // Uno de los puertos proporcionados por Mailtrap
      auth: {
        user: '96c49a967d48d0', // Tu nombre de usuario de Mailtrap
        pass: '********e475', // Tu contraseña de Mailtrap
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'no-reply@yourdomain.com',
      to,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
