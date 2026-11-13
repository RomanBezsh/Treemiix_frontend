"use client";

// User id claim in the backend JWT (ClaimTypes.NameIdentifier), with short fallbacks
const USER_ID_CLAIMS = [
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  "sub",
  "nameid",
];

/** Id of the signed-in user from the stored JWT, or null for guests / malformed tokens. */
export function getSessionUserId(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "="));
    const payload = JSON.parse(json) as Record<string, unknown>;
    for (const claim of USER_ID_CLAIMS) {
      if (typeof payload[claim] === "string" && payload[claim]) return payload[claim] as string;
    }
  } catch {
    // malformed token: treat as signed out
  }
  return null;
}
