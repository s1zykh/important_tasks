import nodemailer, { Transporter } from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

class MailService {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    console.log("authauthauthauthauthauthauthauthauthauth", this.transporter);

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
      <div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export default new MailService();
