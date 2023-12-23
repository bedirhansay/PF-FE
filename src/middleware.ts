import { verifiedToken } from "@utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ReadToken from "./lib/actions/readToken.actions";
import { redirect } from "next/navigation";
export async function middleware(request: NextRequest, res: NextResponse) {
  const { url } = request;
  const pathname = new URL(url).pathname;
  const token = await ReadToken();
  const hasVerifiedToken = await verifiedToken(token as string);

  // if (hasVerifiedToken) {
  //   if (pathname == "/auth/login" || pathname == "/auth/register") {
  //     const url = request.nextUrl.clone();

  //     url.pathname = "/admin/blog";
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // } else {
  //   if (pathname == "/auth/login" || pathname == "/auth/register") {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  // }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
