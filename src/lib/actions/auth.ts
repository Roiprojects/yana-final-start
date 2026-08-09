"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyCredentials,
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth";

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function loginAction(
  email: string,
  password: string,
): Promise<LoginResult> {
  if (!verifyCredentials(email, password)) {
    return { ok: false, error: "Invalid email or password." };
  }
  const token = await createSessionToken(email.trim().toLowerCase());
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
