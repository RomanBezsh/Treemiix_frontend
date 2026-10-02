const ROLE_CLAIM_KEYS = [
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  "role",
  "roles",
];

function decodeJwtRole(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));

    for (const key of ROLE_CLAIM_KEYS) {
      const value = payload[key];
      if (typeof value === "string" && value.length > 0) return value;
      if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    }
    return null;
  } catch {
    return null;
  }
}

export function getSessionRole(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  const jwtRole = decodeJwtRole(token);
  if (jwtRole) return jwtRole;

  return localStorage.getItem("userRole");
}

export function isAdminSession(): boolean {
  return getSessionRole() === "Admin";
}
