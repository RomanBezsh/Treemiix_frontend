// Turns a backend error response into text for the user.
// Priority: { message } → plain-text body → ASP.NET validation { errors } → { detail } →
// a meaningful { title }. Bare status titles such as "Conflict" (ASP.NET ProblemDetails for
// `return Conflict()` without a body) are replaced with a readable sentence for the status.

// Default ProblemDetails titles that say nothing to the user
const GENERIC_TITLES = new Set([
  "bad request",
  "unauthorized",
  "forbidden",
  "not found",
  "method not allowed",
  "conflict",
  "unprocessable entity",
  "too many requests",
  "internal server error",
  "service unavailable",
  "one or more validation errors occurred.",
]);

export function statusMessage(status: number): string {
  if (status === 400) return "The request was rejected. Please check the data and try again.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You don't have permission to do this.";
  if (status === 404) return "Not found.";
  if (status === 409) return "This action conflicts with the current state of your account.";
  if (status === 429) return "Too many requests. Please wait a moment and try again.";
  if (status >= 500) return "Server error. Please try again in a minute.";
  return `Request failed (HTTP ${status}).`;
}

/** Extracts the error text from an already parsed response body (JSON object or plain text). */
export function apiErrorMessage(body: unknown, status: number, fallback?: string): string {
  if (typeof body === "string") {
    const text = body.trim();
    // Plain-text errors like Conflict("User already has a cart"); skip HTML error pages
    if (text && !text.startsWith("<") && text.length <= 300) return text;
  } else if (body && typeof body === "object") {
    const b = body as { message?: unknown; errors?: unknown; detail?: unknown; title?: unknown };
    if (typeof b.message === "string" && b.message.trim()) return b.message.trim();
    if (b.errors && typeof b.errors === "object") {
      const messages = Object.values(b.errors as Record<string, unknown>)
        .flat()
        .filter((m): m is string => typeof m === "string" && m.trim().length > 0);
      if (messages.length > 0) return messages.join(" ");
    }
    if (typeof b.detail === "string" && b.detail.trim()) return b.detail.trim();
    if (typeof b.title === "string" && b.title.trim() && !GENERIC_TITLES.has(b.title.trim().toLowerCase())) {
      return b.title.trim();
    }
  }
  return fallback ?? statusMessage(status);
}

/** Reads a failed Response (JSON or text) and returns the error text. */
export async function readApiError(res: Response, fallback?: string): Promise<string> {
  const text = await res.text().catch(() => "");
  let body: unknown = text;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      // plain-text body
    }
  }
  return apiErrorMessage(body, res.status, fallback);
}
