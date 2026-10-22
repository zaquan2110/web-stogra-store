
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const expected = process.env.ADMIN_API_SECRET;
  const provided = request.headers.get("x-admin-secret");

  if (!expected || !provided || provided !== expected) {
    return NextResponse.json(
      { error: "Akses admin ditolak." },
      { status: 401 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Konfigurasi database server belum lengkap." },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, sender_name, sender_type, message, order_id, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Admin chat error:", error.message);
      return NextResponse.json(
        { error: "Gagal mengambil pesan pelanggan." },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: data ?? [] });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
