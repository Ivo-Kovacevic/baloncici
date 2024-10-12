import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

interface Body {
  message: string;
  email: string;
  name: string;
}

app.post("/", async (req: Request<{}, {}, Body>, res: Response) => {
  try {
    const { message, email, name } = req.body;
    if (!message || !email || !name) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });
    const adminMail = {
      from: process.env.USERNAME,
      to: process.env.USERNAME,
      subject: `Novi mail od ${name}, ${email}`,
      text: `${message}\n\nUpit šalje:\n${name},\n${email}`,
    };
    const confirmationMail = {
      from: process.env.USERNAME,
      to: email,
      subject: "Primili smo vas upit",
      text: `Pozdrav ${name},\n\nPrimili smo vas upit i odgovorit cemo vam u najkracem mogucem roku.\n\nBaloncici`,
    };
    await Promise.all([transporter.sendMail(adminMail), transporter.sendMail(confirmationMail)]);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email: ", error);
  }
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Error: invalid endpoint" });
});

app.listen(PORT, () => {
  console.log(`App is live at port ${PORT}`);
});
