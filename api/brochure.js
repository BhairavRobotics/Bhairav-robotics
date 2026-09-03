import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const BROCHURES = {
  vrishabh: {
    file: path.join(
      process.cwd(),
      "frontend/src/assets/Vrishabh_Combat_UGV_Flyer.pdf"
    ),
    name: "Vrishabh_Combat_UGV_Flyer.pdf",
    productName: "Vrishabh",
  },
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, EMAIL_USER, EMAIL_PASS } =
    process.env;

  if (!SMTP_HOST || !EMAIL_USER || !EMAIL_PASS) {
    res.status(500).json({ error: "Email service is not configured" });
    return;
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const { name, email, productId } = body;
  const normalizedName = name?.trim();
  const normalizedEmail = email?.trim();

  if (!normalizedName || !normalizedEmail) {
    res.status(400).json({ error: "Please provide name and email" });
    return;
  }

  const brochure = BROCHURES[productId];
  if (!brochure) {
    res.status(404).json({ error: "No brochure available for this product" });
    return;
  }

  if (!fs.existsSync(brochure.file)) {
    res.status(404).json({ error: "Brochure file not found" });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const pdf = fs.readFileSync(brochure.file);
  const contactEmail =
    process.env.CONTACT_EMAIL || "contact@bhairavrobotics.in";
  const teamEmail =
    process.env.HR_EMAIL || "contact@bhairavrobotics.in";
  const fromEmail = EMAIL_USER;

  try {
    await transporter.sendMail({
      from: `"Bhairav Robotics" <${fromEmail}>`,
      to: normalizedEmail,
      replyTo: contactEmail,
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
        <p>Thank you for your interest in our <strong>${escapeHtml(
          brochure.productName
        )}</strong> brochure. Please find it attached to this email.</p>
        <p>For any queries, contact us at <a href="mailto:${escapeHtml(
          contactEmail
        )}">${escapeHtml(contactEmail)}</a>.</p>
      `,
      attachments: [
        {
          filename: brochure.name,
          content: pdf,
          contentType: "application/pdf",
        },
      ],
    });

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
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${escapeHtml(
              normalizedName
            )}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(
              normalizedEmail
            )}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Product:</td><td style="padding:8px;">${escapeHtml(
              brochure.productName
            )}</td></tr>
          </table>
        `,
      });
    }

    res.status(201).json({ message: "Brochure sent to your email." });
  } catch (error) {
    console.error("Brochure email error:", error);
    res.status(500).json({
      error: error.message || "Failed to send brochure",
    });
  }
}
