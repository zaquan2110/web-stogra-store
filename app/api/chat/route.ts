import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const discord = typeof body.discord === "string" ? body.discord.trim() : "";
    const product = typeof body.product === "string" ? body.product.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || name.length > 80) {
      return NextResponse.json(
        { error: "Nama wajib diisi dan maksimal 80 karakter." },
        { status: 400 }
      );
    }

    if (!discord || discord.length > 100) {
      return NextResponse.json(
        { error: "Username Discord wajib diisi dan maksimal 100 karakter." },
        { status: 400 }
      );
    }

    if (product.length > 150 || !message || message.length > 2000) {
      return NextResponse.json(
        { error: "Produk atau pesan tidak valid." },
        { status: 400 }
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

    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const savedMessage = [
      `Username Discord: ${discord}`,
      `Produk: ${product || "Belum ditentukan"}`,
      "",
      message,
    ].join("\n");

    const { error } = await supabase.from("chat_messages").insert({
      sender_name: name,
      sender_type: "customer",
      message: savedMessage,
      order_id: null,
    });

    if (error) {
      console.error("Chat save error:", error.message);
      return NextResponse.json(
        { error: "Pesan gagal disimpan. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Pesan berhasil dikirim." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }
}
