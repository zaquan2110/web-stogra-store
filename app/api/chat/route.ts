
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 80;
const MAX_CONTACT_LENGTH = 100;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const contact =
      typeof body.discord === "string" ? body.discord.trim() : "";
    const product =
      typeof body.product === "string" ? body.product.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!name || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: "Nama wajib diisi dan maksimal 80 karakter." },
        { status: 400 }
      );
    }

    if (contact.length > MAX_CONTACT_LENGTH) {
      return NextResponse.json(
        { error: "Kontak maksimal 100 karakter." },
        { status: 400 }
      );
    }

    if (product.length > 150) {
      return NextResponse.json(
        { error: "Nama produk maksimal 150 karakter." },
        { status: 400 }
      );
    }

    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Pesan wajib diisi dan maksimal 2000 karakter." },
        { status: 400 }
      );
    }

    // Penyimpanan pesan akan disambungkan ke database pada tahap berikutnya.
    return NextResponse.json(
      {
        success: true,
        message: "Pesan lolos validasi.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }
}
