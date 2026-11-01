// Fired when the user signs in or out in this tab (localStorage "storage" events only reach other tabs)
export const AUTH_CHANGED_EVENT = "auth-changed";

export function notifyAuthChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userFirstName");
  localStorage.removeItem("userLastName");
  notifyAuthChanged();
}
