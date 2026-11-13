"use client";

import { useSyncExternalStore } from "react";
import { getSessionRole } from "@/lib/adminAuth";
import { subscribeToAuth } from "@/lib/authSession";

/** True for an admin session; false on the server and during hydration. Updates on sign-in/out. */
export function useIsAdmin(): boolean {
  return useSyncExternalStore(subscribeToAuth, () => getSessionRole() === "Admin", () => false);
}
