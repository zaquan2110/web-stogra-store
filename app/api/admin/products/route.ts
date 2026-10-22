
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Server configuration is incomplete.");
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.ADMIN_API_SECRET;
  const suppliedSecret = request.headers.get("x-admin-secret");

  return Boolean(secret && suppliedSecret && suppliedSecret === secret);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Products GET error:", error.message);
      return NextResponse.json(
        { error: "Failed to load products" },
        { status: 500 }
      );
    }

    return NextResponse.json({ products: data ?? [] });
  } catch (error) {
    console.error("Products configuration error:", error);
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const category =
      typeof body.category === "string" ? body.category.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const price = Number(body.price);
    const status = body.status === "inactive" ? "inactive" : "active";
    const imageUrl =
      typeof body.image_url === "string" ? body.image_url.trim() : null;

    if (
      !name ||
      !slug ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !category ||
      !Number.isSafeInteger(price) ||
      price < 0
    ) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        slug,
        category,
        description,
        price,
        status,
        image_url: imageUrl || null,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Products POST error:", error.message);
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};

    if (body.name !== undefined) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return NextResponse.json({ error: "Invalid name" }, { status: 400 });
      }
      updates.name = body.name.trim();
    }

    if (body.slug !== undefined) {
      if (
        typeof body.slug !== "string" ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug.trim())
      ) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
      }
      updates.slug = body.slug.trim();
    }

    if (body.category !== undefined) {
      if (typeof body.category !== "string" || !body.category.trim()) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 }
        );
      }
      updates.category = body.category.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return NextResponse.json(
          { error: "Invalid description" },
          { status: 400 }
        );
      }
      updates.description = body.description.trim();
    }

    if (body.price !== undefined) {
      const price = Number(body.price);
      if (!Number.isSafeInteger(price) || price < 0) {
        return NextResponse.json({ error: "Invalid price" }, { status: 400 });
      }
      updates.price = price;
    }

    if (body.status !== undefined) {
      if (!["active", "inactive"].includes(body.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (body.image_url !== undefined) {
      if (
        body.image_url !== null &&
        typeof body.image_url !== "string"
      ) {
        return NextResponse.json(
          { error: "Invalid image URL" },
          { status: 400 }
        );
      }
      updates.image_url =
        typeof body.image_url === "string" ? body.image_url.trim() || null : null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Products PATCH error:", error.message);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: data });
  } catch (error) {
    console.error("Products PATCH error:", error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (typeof id !== "string" || !id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Products DELETE error:", error.message);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Products DELETE error:", error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 400 }
    );
  }
}
