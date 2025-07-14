import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ForgotPasswordTemplate from './templates/forgot-password.template';
//import { render } from '@react-email/render';
@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private readonly logger = new Logger(MailService.name);
  private readonly RESET_PASSWORD_SUBJECT: string =
    'Resetear contraseña del usuario';
  // const template = render(<MyEmailTemplate /> , { pretty: true });

  async sendResetPasswordEmail(
    mail: string,
    name: string,
    token: string,
  ): Promise<void> {
    const resetUrl = `${this.configService.get<string>('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;
    this.logger.log(resetUrl);
    const message = new ForgotPasswordTemplate(name, resetUrl).getEmail();

    await this.sendMail(mail, this.RESET_PASSWORD_SUBJECT, message);
  }

  private async sendMail(mail: string, subject: string, message: string) {
    try {
      const senderName = this.configService.get<string>('SENDER_NAME');
      if (!senderName) {
        throw new Error('Falta la variable de entorno SENDER_NAME');
      }

      //const senderEmail = this.configService.get<string>('SENDER_EMAIL');
      const senderEmail = `email@gmail.com`;
      if (!senderEmail) {
        throw new Error('Falta la variable de entorno SENDER_EMAIL');
      }
      const result = await this.mailerService.sendMail({
        to: mail,
        from: {
          name: senderName,
          address: 'onboarding@resend.dev',
        },
        subject: subject,
        html: message,
        sender: {
          name: senderName,
          address: '<onboarding@resend.dev>',
        },
      });
      this.logger.log('Successfully sent email', mail, subject);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.log(
        `Failed to send email: ${mail}, ${subject}`,
        error.message,
      );
      return {
        success: false,
      };
    }
  }

  async sendWithResend() {
    const response = await this.sendMail(
      'pendragonn89@gmail.com',
      'Resend Email',
      new ForgotPasswordTemplate(
        'Marcelo',
        'https://example.com/reset-password',
      ).getTest(),
    );

    if (!response) {
      this.logger.error('Error', response);
    }

    return response;
  }
}
