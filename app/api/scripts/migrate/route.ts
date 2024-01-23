export const dynamic = "force-dynamic";

// import main from "@/scripts/migrate";
import { NextResponse } from "next/server";

// https://github.com/drizzle-team/drizzle-orm/issues/680
export async function GET() {
  // await main();
  return NextResponse.json({ message: "TODO" });
}
