export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
}
