import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { createMessageSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("offerId");
    
    if (!offerId) {
      return NextResponse.json(
        { error: "offerId es requerido" },
        { status: 400 }
      );
    }
    
    const data = await db.query.messages.findMany({
      where: (m, { eq }) => eq(m.offerId, offerId),
      with: { sender: true },
      orderBy: (m, { asc }) => [asc(m.createdAt)],
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createMessageSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    
    const [newMessage] = await db
      .insert(messages)
      .values(parsed.data)
      .returning();
    
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}