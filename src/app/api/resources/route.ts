import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resources } from "@/lib/schema";
import { createResourceSchema } from "@/lib/validators";

export async function GET() {
  try {
    const data = await db.query.resources.findMany({
      with: { owner: true },
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createResourceSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    
    const [newResource] = await db
      .insert(resources)
      .values(parsed.data)
      .returning();
    
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}