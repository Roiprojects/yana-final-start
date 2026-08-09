/**
 * Route guard: protects the admin panel.
 * Any /admin/* route (except the login page) requires a valid signed session
 * cookie; otherwise the request is redirected to /admin/login.
 */
import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (isAdmin && !isLogin) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const email = await verifySessionToken(token);
    if (!email) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Already signed in and visiting the login page → send to dashboard.
  if (isLogin) {
    const email = await verifySessionToken(
      request.cookies.get(SESSION_COOKIE)?.value,
    );
    if (email) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
