import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const path = req.nextUrl.pathname;
  // const token = req.cookies.get("token")?.value || "";
  // const isPublicPath =
  //   path === "/login" ||
  //   path === "/signup" ||
  //   path === "/verify-email" ||
  //   path === "/new-password";
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", req.nextUrl));
  // }
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", req.nextUrl));
  // }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/orders",
    "/products",
    "/settings/:path*",
    "/login",
    "/register",
    "/verify-email",
    "/forget-password",
    "/new-password",
  ],
};
