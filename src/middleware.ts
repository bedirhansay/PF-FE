import { verifiedToken } from "@utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ReadToken from "./lib/actions/readToken.actions";

export async function middleware(request: NextRequest) {
  const { url } = request;

  const pathname = new URL(url).pathname;
  const token = await ReadToken();
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
  matcher: ["/admin/:path*"],
};
