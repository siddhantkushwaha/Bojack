import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { subscribeEmail } from "@/lib/buttondown";

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("subscribeEmail", () => {
  it("skips the upstream call when no API key is set", async () => {
    vi.stubEnv("BUTTONDOWN_API_KEY", "");
    const result = await subscribeEmail("a@b.com");
    expect(result.status).toBe("skipped");
  });

  it("returns subscribed on a 201", async () => {
    vi.stubEnv("BUTTONDOWN_API_KEY", "key");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("{}", { status: 201 })),
    );
    const result = await subscribeEmail("a@b.com");
    expect(result.status).toBe("subscribed");
  });

  it("detects an already-subscribed address", async () => {
    vi.stubEnv("BUTTONDOWN_API_KEY", "key");
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response('{"detail":"already subscribed"}', { status: 400 }),
      ),
    );
    const result = await subscribeEmail("a@b.com");
    expect(result.status).toBe("already_subscribed");
  });

  it("returns an error on upstream failure", async () => {
    vi.stubEnv("BUTTONDOWN_API_KEY", "key");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("boom", { status: 500 })),
    );
    const result = await subscribeEmail("a@b.com");
    expect(result.status).toBe("error");
  });
});
