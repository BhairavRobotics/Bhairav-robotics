import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Paths to the brochure PDFs under the frontend source assets.
const BROCHURE_DIR = path.resolve(__dirname, "../../../frontend/src/assets");

const BROCHURES = {
  vrishabh: {
    file: path.join(BROCHURE_DIR, "Vrishabh_Combat_UGV_Flyer.pdf"),
    name: "Vrishabh_Combat_UGV_Flyer.pdf",
    productName: "Vrishabh",
  },
};

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
 * @desc    Send a product brochure by email to the requesting user
 * @route   POST /api/brochure
 * @access  Public
 */
export const sendBrochure = async (req, res, next) => {
  try {
    assertEmailConfig();

    const { name, email, productId } = req.body;
    const normalizedName = name?.trim();
    const normalizedEmail = email?.trim();

    if (!normalizedName || !normalizedEmail) {
      res.status(400);
      throw new Error("Please provide name and email");
    }

    const brochure = BROCHURES[productId];
    if (!brochure) {
      res.status(404);
      throw new Error("No brochure available for this product");
    }

    if (!fs.existsSync(brochure.file)) {
      res.status(404);
      throw new Error("Brochure file not found");
    }

    const pdf = fs.readFileSync(brochure.file);
    const contactEmail = process.env.CONTACT_EMAIL || "contact@bhairavrobotics.in";
    const fromEmail = process.env.EMAIL_USER || contactEmail;

    // 1. Email the brochure to the requesting user.
    const userMailOptions = {
      from: `"Bhairav Robotics" <${fromEmail}>`,
      to: normalizedEmail,
      replyTo: fromEmail,
      subject: `Your ${brochure.productName} Brochure`,
      text: [
        `Hello ${normalizedName},`,
        "",
        `Thank you for your interest in the ${brochure.productName} brochure.`,
        "Please find the brochure attached to this email.",
        "",
        "For any queries, contact us at " + contactEmail + ".",
      ].join("\n"),
      html: `
        <h2>Your ${escapeHtml(brochure.productName)} Brochure</h2>
        <p>Hello <strong>${escapeHtml(normalizedName)}</strong>,</p>
        <p>Thank you for your interest in our <strong>${escapeHtml(brochure.productName)}</strong> brochure. Please find it attached to this email.</p>
        <p>For any queries, contact us at <a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a>.</p>
      `,
      attachments: [
        {
          filename: brochure.name,
          content: pdf,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(userMailOptions);

    // 2. Notify the team so they know who requested a brochure.
    const teamEmail = process.env.HR_EMAIL || process.env.CONTACT_EMAIL;
    if (teamEmail) {
      await transporter.sendMail({
        from: `"Bhairav Robotics" <${fromEmail}>`,
        to: teamEmail,
        replyTo: normalizedEmail,
        subject: `Brochure Request: ${brochure.productName}`,
        text: [
          "New brochure download request.",
          "",
          `Name: ${normalizedName}`,
          `Email: ${normalizedEmail}`,
          `Product: ${brochure.productName}`,
        ].join("\n"),
        html: `
          <h2>New Brochure Request</h2>
          <table style="border-collapse:collapse; font-family:Arial, sans-serif;">
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${escapeHtml(normalizedName)}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(normalizedEmail)}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Product:</td><td style="padding:8px;">${escapeHtml(brochure.productName)}</td></tr>
          </table>
        `,
      });
    }

    res.status(201).json({ message: "Brochure sent to your email." });
  } catch (error) {
    next(error);
  }
};
