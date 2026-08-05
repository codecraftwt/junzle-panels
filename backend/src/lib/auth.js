import crypto from "node:crypto";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function getSecret() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function createToken(username) {
  const payload = {
    username,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [body, signature] = parts;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");

  if (signature !== expected) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.username || payload.exp < Date.now()) return null;
    return payload.username;
  } catch {
    return null;
  }
}

export { createToken, verifyToken };
