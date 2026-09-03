import nodemailer from "nodemailer";

const HR_EMAIL = process.env.HR_EMAIL || "contact@bhairavrobotics.in";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const assertEmailConfig = () => {
  const missing = ["SMTP_HOST", "EMAIL_USER", "EMAIL_PASS"].filter(
    (key) => !process.env[key],
  );

  if (missing.length > 0) {
    const error = new Error(`Missing email configuration: ${missing.join(", ")}`);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * @desc    Submit a job / internship application (sends email to HR)
 * @route   POST /api/apply
 * @access  Public
 */
export const submitApplication = async (req, res, next) => {
  try {
    assertEmailConfig();

    const { fullName, email, phone, type, field } = req.body;
    const normalizedName = fullName?.trim();
    const normalizedEmail = email?.trim();
    const normalizedPhone = phone?.trim();

    if (!normalizedName || !normalizedEmail || !normalizedPhone) {
      res.status(400);
      throw new Error("Please provide fullName, email, and phone");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Resume PDF file is required");
    }

    const mailOptions = {
      from: `"Bhairav Robotics Careers" <${process.env.EMAIL_USER}>`,
      to: HR_EMAIL,
      replyTo: normalizedEmail,
      subject: `New Career Application: ${normalizedName}`,
      text: [
        "New career application received.",
        "",
        `Name: ${normalizedName}`,
        `Email: ${normalizedEmail}`,
        `Phone: ${normalizedPhone}`,
        `Application Type: ${type || "Not specified"}`,
        `Field: ${field || "Not specified"}`,
        "",
        "Resume is attached.",
      ].join("\n"),
      html: `
        <h2>New Job Application Received</h2>
        <table style="border-collapse:collapse; font-family:Arial, sans-serif;">
          <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${escapeHtml(normalizedName)}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(normalizedEmail)}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Phone:</td><td style="padding:8px;">${escapeHtml(normalizedPhone)}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Application Type:</td><td style="padding:8px;">${escapeHtml(type || "Not specified")}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Field:</td><td style="padding:8px;">${escapeHtml(field || "Not specified")}</td></tr>
        </table>
        <p style="margin-top:16px;"><strong>Resume:</strong> Attached as PDF</p>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    next(error);
  }
};
