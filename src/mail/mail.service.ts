import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ForgotPasswordTemplate from './templates/forgot-password.template';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private readonly logger = new Logger(MailService.name);
  private readonly RESET_PASSWORD_SUBJECT: string = 'Resetear contraseña';

  async sendResetPasswordEmail(
    mail: string,
    name: string,
    token: string,
  ): Promise<void> {
    const resetUrl = `${this.configService.get<string>('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;
    this.logger.log(resetUrl);
    const message = new ForgotPasswordTemplate(name, resetUrl).getEmail();
  }

  private async sendMail(mail: string, subject: string, message: string) {
    try {
      const senderName = this.configService.get<string>('SENDER_NAME');
      if (!senderName) {
        throw new Error('Falta la variable de entorno SENDER_NAME');
      }

      const senderEmail = this.configService.get<string>('SENDER_EMAIL');
      if (!senderEmail) {
        throw new Error('Falta la variable de entorno SENDER_EMAIL');
      }
      await this.mailerService.sendMail({
        to: mail,
        from: {
          name: senderName,
          address: senderEmail,
        },
        subject: subject,
        html: message,
        sender: {
          name: senderName,
          address: senderEmail,
        },
      });
      this.logger.log('Successfully sent email', mail, subject);
      return {
        success: true,
      };
    } catch (error) {
      this.logger.log('Failed to send email', mail, subject);
      return {
        success: false,
      };
    }
  }
}
