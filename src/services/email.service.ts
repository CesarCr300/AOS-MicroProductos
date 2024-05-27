import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { env } from 'process';

@Injectable()
export class EmailService {
  private readonly apiKey: string;
  private readonly mailService: MailService;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = env.SENDGRID_API_KEY;
    this.mailService = new MailService();
    this.mailService.setApiKey(env.SENDGRID_API_KEY);
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    try {
      const msg = {
        to,
        from: env.SENDGRID_EMAIL_SENDER, // Update with your verified sender email
        subject,
        html: htmlContent,
      };
      await this.mailService.send(msg);
    } catch (error) {
      console.error('Error sending email:', error.response.body.errors);
    }
  }
}
