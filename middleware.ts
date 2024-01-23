import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/scripts")) {
    const key = request.nextUrl.searchParams.get("scripts_api_key");
    if (key !== process.env.SCRIPTS_API_KEY) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: "/:path*",
};
