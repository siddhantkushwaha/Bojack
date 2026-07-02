import { getDb } from "./db";

export type AddSubscriberResult = { created: boolean };

// Insert an email, treating a duplicate as a no-op. `created` is false when the
// address was already present, which the route maps to "already subscribed".
export function addSubscriber(email: string): AddSubscriberResult {
  const normalized = email.trim().toLowerCase();
  const info = getDb()
    .prepare(
      "INSERT INTO subscribers (email) VALUES (?) ON CONFLICT(email) DO NOTHING",
    )
    .run(normalized);
  return { created: info.changes > 0 };
}

export function countSubscribers(): number {
  const row = getDb()
    .prepare("SELECT COUNT(*) AS n FROM subscribers")
    .get() as { n: number };
  return row.n;
}

export function listSubscribers(): { email: string; created_at: string }[] {
  return getDb()
    .prepare("SELECT email, created_at FROM subscribers ORDER BY created_at DESC")
    .all() as { email: string; created_at: string }[];
}
