import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { offers } from "@/lib/schema";
import { createOfferSchema } from "@/lib/validators";

export async function GET() {
  try {
    const data = await db.query.offers.findMany({
      with: {
        fromResource: { with: { owner: true } },
        toResource: { with: { owner: true } },
      },
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createOfferSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    
    const [newOffer] = await db
      .insert(offers)
      .values({
        fromId: parsed.data.fromId,
        toId: parsed.data.toId,
        status: "pending",
      })
      .returning();
    
    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}