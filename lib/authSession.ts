import { useSyncExternalStore } from "react";

/** Fired on the window whenever the stored session (sign-in, sign-out, profile name) changes. */
export const AUTH_CHANGED_EVENT = "auth-changed";

export function notifyAuthChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

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
  notifyAuthChanged();
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userFirstName");
  localStorage.removeItem("userLastName");
  notifyAuthChanged();
}

/** Clears the session and tells the header and cart badge to refresh; the caller navigates. */
export function signOut(): void {
  clearAuthSession();
  window.dispatchEvent(new Event("cart-updated"));
}

export interface AuthUser {
  isAuthenticated: boolean;
  /** Same text everywhere: first name, else e-mail, else "Customer" */
  displayName: string;
}

const SIGNED_OUT: AuthUser = { isAuthenticated: false, displayName: "Customer" };
let cachedKey = "";
let cachedUser: AuthUser = SIGNED_OUT;

function readAuthUser(): AuthUser {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const displayName = localStorage.getItem("userFirstName") || localStorage.getItem("userEmail") || "Customer";
  const key = `${isAuthenticated}|${displayName}`;
  // useSyncExternalStore needs the same object while nothing changed
  if (key !== cachedKey) {
    cachedKey = key;
    cachedUser = { isAuthenticated, displayName };
  }
  return cachedUser;
}

/** Subscribe to session changes in this tab (auth-changed) and in other tabs (storage). */
export function subscribeToAuth(onChange: () => void): () => void {
  window.addEventListener(AUTH_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The signed-in user as stored in localStorage; signed out on the server and during hydration. */
export function useAuthUser(): AuthUser {
  return useSyncExternalStore(subscribeToAuth, readAuthUser, () => SIGNED_OUT);
}
