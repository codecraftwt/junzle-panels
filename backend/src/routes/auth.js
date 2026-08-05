import { Router } from "express";
import { createToken, verifyToken } from "../lib/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username === adminUsername && password === adminPassword) {
    const token = createToken(username);
    return res.json({ token, username });
  }

  res.status(401).json({ error: "Invalid username or password." });
});

router.get("/verify", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (verifyToken(token)) {
    return res.json({ valid: true });
  }

  res.status(401).json({ valid: false, error: "Not authenticated." });
});

export default router;
