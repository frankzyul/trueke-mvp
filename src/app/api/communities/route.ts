import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { communities } from "@/lib/schema";
import { createCommunitySchema } from "@/lib/validators";

export async function GET() {
  try {
    const data = await db.query.communities.findMany({
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching communities:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createCommunitySchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    
    const [newCommunity] = await db
      .insert(communities)
      .values(parsed.data)
      .returning();
    
    return NextResponse.json(newCommunity, { status: 201 });
  } catch (error) {
    console.error("Error creating community:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}