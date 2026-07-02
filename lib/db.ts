import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

// Lazily-opened singleton SQLite connection. Kept lazy so the database file is
// only created when something actually queries it (never at build time).
let db: Database.Database | null = null;

function resolveDbPath(): string {
  // In the container this is set to /app/data/app.db (a mounted volume).
  // Locally it defaults to ./data/app.db.
  return process.env.DATABASE_PATH || path.join(process.cwd(), "data", "app.db");
}

function migrate(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      email      TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export function getDb(): Database.Database {
  if (db) return db;

  const dbPath = resolveDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL"); // better concurrency for read-heavy workloads
  db.pragma("foreign_keys = ON");
  migrate(db);
  return db;
}

// Test helper: drop the cached connection so a new DATABASE_PATH takes effect.
export function __resetDbForTests(): void {
  if (db) {
    db.close();
    db = null;
  }
}
