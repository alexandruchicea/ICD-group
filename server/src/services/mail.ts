// src/services/MailService.ts
import nodemailer from "nodemailer";

export interface MailFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  partnershipType?: string;
  message: string;
}

export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactMail(formData: MailFormData) {
    const mailOptions = {
      from: `"ICD Group Website" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "📩 Mesaj nou din formularul de contact",
      replyTo: formData.email,
      html: `
        <h2>Detalii Contact:</h2>
        <p><b>Nume:</b> ${formData.name}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Telefon:</b> ${formData.phone || "-"}</p>
        <p><b>Companie:</b> ${formData.company || "-"}</p>
        <p><b>Tip Parteneriat:</b> ${formData.partnershipType || "-"}</p>
        <h3>Mesaj:</h3>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
