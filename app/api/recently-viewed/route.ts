import { NextResponse } from "next/server";

// Secure server storage mapped by user session token: { [token: string]: any[] }
const serverHistory: Record<string, any[]> = {};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : "guest";
  
  const history = serverHistory[token] || [];
  return NextResponse.json({ data: history });
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : "guest";

    const body = await request.json();
    const { product } = body;

    if (!product || !product.id) {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }

    if (!serverHistory[token]) {
      serverHistory[token] = [];
    }

    const existing = serverHistory[token];
    const filtered = existing.filter((item: any) => String(item.id) !== String(product.id));
    const updated = [product, ...filtered].slice(0, 20);
    
    serverHistory[token] = updated;

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error saving recently viewed on server:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
