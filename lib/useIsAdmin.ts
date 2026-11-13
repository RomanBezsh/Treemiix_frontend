"use client";

import { useSyncExternalStore } from "react";
import { getSessionRole } from "@/lib/adminAuth";

// The role only changes on sign-in/out, which navigates away, so there is nothing to subscribe to.
const subscribeToNothing = () => () => {};

/** True for an admin session; false on the server and during hydration. */
export function useIsAdmin(): boolean {
  return useSyncExternalStore(subscribeToNothing, () => getSessionRole() === "Admin", () => false);
}
