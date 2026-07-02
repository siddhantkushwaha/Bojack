// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tmpDir: string;

beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "myblog-subs-"));
  process.env.DATABASE_PATH = path.join(tmpDir, "app.db");
});

afterAll(async () => {
  const { __resetDbForTests } = await import("@/lib/db");
  __resetDbForTests();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("subscribers store", () => {
  it("inserts a new subscriber and persists it", async () => {
    const { addSubscriber, countSubscribers, listSubscribers } = await import(
      "@/lib/subscribers"
    );
    expect(addSubscriber("Reader@Example.com").created).toBe(true);
    expect(countSubscribers()).toBe(1);
    // Emails are normalized to lowercase.
    expect(listSubscribers()[0].email).toBe("reader@example.com");
  });

  it("treats a duplicate (case-insensitive) as already subscribed", async () => {
    const { addSubscriber, countSubscribers } = await import(
      "@/lib/subscribers"
    );
    expect(addSubscriber("reader@example.com").created).toBe(false);
    expect(addSubscriber("READER@example.com").created).toBe(false);
    expect(countSubscribers()).toBe(1);
  });
});
