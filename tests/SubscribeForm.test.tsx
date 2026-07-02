import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscribeForm } from "@/components/SubscribeForm";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("SubscribeForm", () => {
  it("shows a success message after a successful submit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ ok: true, message: "You're on the list." }), {
            status: 200,
          }),
      ),
    );

    render(<SubscribeForm />);
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "reader@example.com",
    );
    await userEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/on the list/i),
    );
  });

  it("shows an error message when the API rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ ok: false, message: "Invalid email." }), {
            status: 400,
          }),
      ),
    );

    render(<SubscribeForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "reader@example.com");
    await userEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/invalid email/i),
    );
  });
});
