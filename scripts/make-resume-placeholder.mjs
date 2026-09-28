/**
 * Generates a minimal, valid one-page PDF so the resume links on the site
 * resolve to a real file before the actual CV is dropped in.
 *
 * Replace public/Ganesamurthi-V-Resume.pdf with the real document — this
 * script exists only so the download action is never broken.
 *
 * Usage: node scripts/make-resume-placeholder.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUT = resolve("public/Ganesamurthi-V-Resume.pdf");

const lines = [
  ["F1", 26, 60, 770, "Ganesamurthi V"],
  ["F2", 13, 60, 746, "Full-Stack Developer"],
  ["F2", 10, 60, 726, "ganesamurthiv@gmail.com  |  +91 93848 86895  |  github.com/Ganesamurthi-V"],

  ["F1", 12, 60, 682, "PLACEHOLDER"],
  ["F2", 10.5, 60, 662, "This is a placeholder file so the resume links on the portfolio resolve."],
  ["F2", 10.5, 60, 646, "Replace public/Ganesamurthi-V-Resume.pdf with the real CV."],

  ["F1", 12, 60, 602, "PROFILE"],
  ["F2", 10.5, 60, 582, "Computer Science and Business Systems undergraduate focused on full-stack"],
  ["F2", 10.5, 60, 566, "development. Builds web applications across frontend, backend, database and"],
  ["F2", 10.5, 60, 550, "deployment layers, with an interest in SaaS products."],

  ["F1", 12, 60, 506, "SELECTED PROJECTS"],
  ["F1", 10.5, 60, 486, "GymFlow - Gym Management SaaS (live)"],
  ["F2", 10.5, 60, 470, "Multi-tenant SaaS for independent gyms. Owner console plus member PWA,"],
  ["F2", 10.5, 60, 454, "payments, dues, attendance and WhatsApp renewal automation."],
  ["F2", 9.5, 60, 438, "Next.js, TypeScript, PostgreSQL, Supabase  |  gymflow.sbs"],

  ["F1", 10.5, 60, 410, "LightBase - Open Source Backend Platform"],
  ["F2", 10.5, 60, 394, "Self-hostable backend: auth, generated REST APIs and a data console."],
  ["F2", 9.5, 60, 378, "TypeScript, PostgreSQL, Docker"],

  ["F1", 10.5, 60, 350, "Air Filter Prediction System"],
  ["F2", 10.5, 60, 334, "Predictive maintenance service exposing filter-health models over a Flask API."],
  ["F2", 9.5, 60, 318, "Python, Flask, TSMixer"],

  ["F1", 12, 60, 274, "EXPERIENCE"],
  ["F1", 10.5, 60, 254, "Software Development Intern - Iinvsys"],
  ["F2", 9.5, 60, 238, "June 2025 - August 2025"],
  ["F2", 10.5, 60, 220, "Built and deployed an AI-powered Air Filter Prediction System: preprocessing,"],
  ["F2", 10.5, 60, 204, "feature engineering, model training, Flask REST APIs and production deployment."],

  ["F1", 12, 60, 160, "EDUCATION"],
  ["F2", 10.5, 60, 140, "B.Tech, Computer Science and Business Systems"],
  ["F2", 10.5, 60, 124, "Sri Manakula Vinayagar Engineering College - Expected May 2027"],
];

const escape = (text) => text.replace(/([\\()])/g, "\\$1");

const content =
  lines
    .map(
      ([font, size, x, y, text]) =>
        `BT /${font} ${size} Tf ${x} ${y} Td (${escape(text)}) Tj ET`,
    )
    .join("\n") + "\n";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] " +
    "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}endstream`,
  "<< /Title (Ganesamurthi V - Full-Stack Developer) /Author (Ganesamurthi V) /Producer (portfolio placeholder) >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];

objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\n`;
pdf += `startxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, Buffer.from(pdf, "latin1"));

console.log(`Wrote ${OUT} (${Buffer.byteLength(pdf, "latin1")} bytes)`);
