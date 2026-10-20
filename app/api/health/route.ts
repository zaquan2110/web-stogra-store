import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    store: "STOGRA STORE",
    services: ["Website Chat", "Discord"],
    payment: "Manual",
    timestamp: new Date().toISOString(),
  });
}
