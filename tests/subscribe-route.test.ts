// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tmpDir: string;

beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bojack-route-"));
  process.env.DATABASE_PATH = path.join(tmpDir, "app.db");
});

afterAll(async () => {
  const { __resetDbForTests } = await import("@/lib/db");
  __resetDbForTests();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

beforeEach(() => {
  vi.stubEnv("BUTTONDOWN_API_KEY", ""); // no upstream forward during tests
});

async function callSubscribe(body: unknown) {
  const { POST } = await import("@/app/api/subscribe/route");
  const req = new Request("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const res = await POST(req);
  return { status: res.status, json: await res.json() };
}

describe("POST /api/subscribe", () => {
  it("saves a valid new email", async () => {
    const { status, json } = await callSubscribe({ email: "new@example.com" });
    expect(status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.message).toMatch(/on the list/i);
  });

  it("reports an already-subscribed email", async () => {
    await callSubscribe({ email: "dupe@example.com" });
    const { status, json } = await callSubscribe({ email: "dupe@example.com" });
    expect(status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.message).toMatch(/already subscribed/i);
  });

  it("rejects a malformed email", async () => {
    const { status, json } = await callSubscribe({ email: "not-an-email" });
    expect(status).toBe(400);
    expect(json.ok).toBe(false);
  });

  it("rejects a missing email", async () => {
    const { status, json } = await callSubscribe({});
    expect(status).toBe(400);
    expect(json.ok).toBe(false);
  });
});
