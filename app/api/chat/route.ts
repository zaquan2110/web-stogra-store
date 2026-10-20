import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    service: "STOGRA STORE Chat API",
    message: "API aktif",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const discord = String(body.discord ?? "").trim();
    const product = String(body.product ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !discord || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, username Discord, dan pesan wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      discord.length > 100 ||
      product.length > 150 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        { success: false, message: "Data melebihi batas karakter." },
        { status: 400 }
      );
    }

    // Belum menyimpan pesan ke database.
    // Integrasi database akan ditambahkan pada tahap berikutnya.
    return NextResponse.json({
      success: true,
      message: "Data pesanan berhasil diterima oleh API.",
      order: { name, discord, product, message },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }
}
