import type { NextFunction, Request, Response } from "express";

/**
 * Minimal admin auth: an HMAC-signed session token stored in an httpOnly cookie.
 * Credentials live in env (ADMIN_EMAIL/ADMIN_PASSWORD); the cookie is signed with
 * AUTH_SECRET and cannot be forged without it.
 */

export const SESSION_COOKIE = "yana_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const secret = process.env.AUTH_SECRET ?? "";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );
  return b64url(sig);
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verify email/password against env credentials. */
export function verifyCredentials(email: string, password: string): boolean {
  const e = process.env.ADMIN_EMAIL ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  if (!e || !p) return false;
  return (
    safeEqual(email.trim().toLowerCase(), e.trim().toLowerCase()) &&
    safeEqual(password, p)
  );
}

/** Create a signed session token: `<payloadB64>.<sig>`. */
export async function createSessionToken(email: string): Promise<string> {
  const payload = b64url(
    new TextEncoder().encode(
      JSON.stringify({ sub: email, exp: Date.now() + MAX_AGE_SECONDS * 1000 }),
    ),
  );
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Validate a session token; returns the subject email or null. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<string | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await hmac(payload);
  if (!safeEqual(sig, expected)) return null;
  try {
    const json = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
          (c) => c.charCodeAt(0),
        ),
      ),
    ) as { sub?: string; exp?: number };
    if (!json.exp || json.exp < Date.now()) return null;
    return json.sub ?? null;
  } catch {
    return null;
  }
}

/** Read a single cookie by name from the raw Cookie header. */
export function readCookie(req: Request, name: string): string | undefined {
  const raw = req.headers.cookie;
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (key === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return undefined;
}

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

/** Set the signed session cookie on a response. */
export function setSessionCookie(res: Response, token: string): void {
  res.cookie(SESSION_COOKIE, token, {
    ...cookieBase,
    maxAge: MAX_AGE_SECONDS * 1000,
  });
}

/** Clear the session cookie. */
export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
}

/**
 * Express middleware guarding /admin/* API routes. Reads the session cookie,
 * verifies it, and attaches the authenticated email to res.locals.adminEmail.
 * Responds 401 when unauthenticated.
 */
export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = readCookie(req, SESSION_COOKIE);
  const email = await verifySessionToken(token);
  if (!email) {
    res.status(401).json({ ok: false, error: "Not authorised." });
    return;
  }
  res.locals.adminEmail = email;
  next();
}
