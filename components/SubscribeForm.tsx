"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };

      if (data.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
      <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
        Subscribe
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        New posts on backend engineering and distributed systems, straight to
        your inbox. No spam.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-accent dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-green-600 dark:text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
