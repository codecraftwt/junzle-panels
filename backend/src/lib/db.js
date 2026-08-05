import { MongoClient } from "mongodb";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("Could not set custom DNS servers, using default resolver:", dnsErr);
}

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const client = new MongoClient(url);

let db = null;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log(`Successfully connected to MongoDB database: ${db.databaseName}`);
    
    await db.collection("Lead").createIndex({ createdAt: -1 });

    try {
      await db.collection("Lead").createIndex(
        { email: 1 },
        { unique: true, name: "unique_lead_email" }
      );
    } catch (err) {
      console.warn("Could not create unique index on Lead.email:", err.message);
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

export { client };
