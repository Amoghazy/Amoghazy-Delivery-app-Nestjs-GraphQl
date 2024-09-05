import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
type mailOptions = {
  email: string;
  subject: string;
  template: string;
  activationCode: string;
  name: string;
};
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(mailOptions: mailOptions) {
    await this.mailerService.sendMail({
      to: mailOptions.email,
      subject: mailOptions.subject,
      template: mailOptions.template,
      context: {
        activationCode: mailOptions.activationCode,
        name: mailOptions.name,
      },
    });
  }
}
