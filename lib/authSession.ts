export interface AuthSession {
  token: string;
  refreshToken?: string;
  userRole?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

export function saveAuthSession(session: AuthSession): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", session.token);

  if (session.refreshToken) {
    localStorage.setItem("refreshToken", session.refreshToken);
  }
  if (session.userRole) {
    localStorage.setItem("userRole", session.userRole);
  }
  if (session.userEmail) {
    localStorage.setItem("userEmail", session.userEmail);
  }
  if (session.userFirstName !== undefined) {
    localStorage.setItem("userFirstName", session.userFirstName);
  }
  if (session.userLastName !== undefined) {
    localStorage.setItem("userLastName", session.userLastName);
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userRole");
}
