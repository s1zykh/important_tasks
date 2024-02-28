import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async sendActivationMail(to, link) {
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
