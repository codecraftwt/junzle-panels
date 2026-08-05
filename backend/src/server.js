import "dotenv/config";
import express from "express";
import cors from "cors";
import leadsRouter from "./routes/leads.js";
import authRouter from "./routes/auth.js";
import { connectDB } from "./lib/db.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://junzle-panel-blond.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some(allowed => {
        return allowed.replace(/\/$/, "") === origin.replace(/\/$/, "");
      });
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`JUNZLE backend running at ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
}

start();
