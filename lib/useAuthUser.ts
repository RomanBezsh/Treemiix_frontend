"use client";

import { useMemo, useSyncExternalStore } from "react";
import { AUTH_CHANGED_EVENT } from "@/lib/authSession";

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(AUTH_CHANGED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(AUTH_CHANGED_EVENT, onChange);
  };
}

// A string snapshot keeps the value stable between renders
function getSnapshot(): string {
  if (!localStorage.getItem("token")) return "";
  return JSON.stringify({
    firstName: localStorage.getItem("userFirstName") || "",
    lastName: localStorage.getItem("userLastName") || "",
    email: localStorage.getItem("userEmail") || "",
  });
}

function getServerSnapshot(): string {
  return "";
}

/** Signed-in user from localStorage, or null for guests (and during server render). */
export function useAuthUser(): AuthUser | null {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => (snapshot ? (JSON.parse(snapshot) as AuthUser) : null), [snapshot]);
}

/** Full name for the profile card: "First Last", falling back to the greeting name. */
export function getFullName(user: AuthUser): string {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return fullName || getDisplayName(user);
}

/** Name for greetings: first name, then the part of the email before "@". */
export function getDisplayName(user: AuthUser): string {
  return user.firstName || user.email.split("@")[0] || "there";
}
