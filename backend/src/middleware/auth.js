import { verifyToken } from "../lib/auth.js";

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (verifyToken(token)) {
    return next();
  }

  res.status(401).json({ error: "Not authenticated." });
}

export { requireAuth };
