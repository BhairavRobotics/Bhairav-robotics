import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @desc    Submit a contact message (sends email to HR)
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("Please provide name, email, subject, and message");
    }

    const hrEmail = process.env.HR_EMAIL;
    if (!hrEmail) {
      throw new Error("HR_EMAIL is not defined in your .env file");
    }

    const mailOptions = {
      from: `"Bhairav Robotics Contact" <${process.env.EMAIL_USER}>`,
      to: hrEmail,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Message Received</h2>
        <table style="border-collapse:collapse; font-family:Arial, sans-serif;">
          <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Subject:</td><td style="padding:8px;">${subject}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Message:</td><td style="padding:8px;">${message}</td></tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    next(error);
  }
};
