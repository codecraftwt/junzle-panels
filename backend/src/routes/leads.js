import { Router } from "express";
import { getDb } from "../lib/db.js";
import { validateLead } from "../lib/validation.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { valid, errors, data } = validateLead(req.body);

  if (!valid) {
    return res.status(400).json({ error: "Validation failed.", fields: errors });
  }

  try {
    const db = getDb();

    const existing = await db.collection("Lead").findOne({ email: data.email });
    if (existing) {
      return res.status(409).json({
        error: "This email has already been submitted.",
        fields: { email: "This email has already been submitted. Please use a different email address." },
      });
    }

    const now = new Date();
    const result = await db.collection("Lead").insertOne({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      clubName: data.clubName,
      message: data.message,
      createdAt: now,
    });
    res.status(201).json({ message: "Lead submitted successfully." });
  } catch (err) {
    console.error("Failed to create lead:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

router.get("/", requireAuth, async (_req, res) => {
  try {
    const db = getDb();
    const leadsDocs = await db.collection("Lead")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    const leads = leadsDocs.map(doc => ({
      id: doc._id.toString(),
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      phone: doc.phone,
      clubName: doc.clubName,
      message: doc.message,
      createdAt: doc.createdAt,
    }));
    res.json(leads);
  } catch (err) {
    console.error("Failed to fetch leads:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
