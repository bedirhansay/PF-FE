// middleware.ts

import { verifiedToken } from "@utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { headers, url } = request;
  const authorizationHeader =
    headers.get("Authorization") || headers.get("authorization");
  const token = authorizationHeader?.split("Bearer:")[1] ?? "";
  console.log(token);

  const pathname = new URL(url).pathname;
  const hasVerifiedToken = await verifiedToken({ token });

  if (hasVerifiedToken) {
    if (pathname == "/api/auth/login" || pathname == "/api/auth/register") {
      return NextResponse.json(
        { error: "Zaten giriş yaptınız" },
        { status: 400 }
      );
    }
    return NextResponse.next();
  } else {
    if (pathname == "/api/auth/login" || pathname == "/api/auth/register") {
      return NextResponse.next();
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: ["/api/:path*", "/"],
};
