import { db } from "@/lib/db";
import { communities, resources, offers, messages } from "@/lib/schema";

async function seed() {
  console.log("🌱 Iniciando seed...");

  // Limpiar datos existentes en orden correcto
  console.log("🧹 Limpiando datos existentes...");
  await db.delete(messages);
  await db.delete(offers);
  await db.delete(resources);
  await db.delete(communities);

  // Crear comunidades
  console.log("👥 Creando comunidades...");
  const [community1, community2] = await db
    .insert(communities)
    .values([
      {
        name: "Eco Warriors",
        description: "Comunidad enfocada en prácticas sostenibles y cuidado del medio ambiente",
        avatar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop&crop=faces",
      },
      {
        name: "Tech Innovators",
        description: "Desarrolladores y tecnólogos compartiendo conocimiento y herramientas",
        avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=faces",
      },
    ])
    .returning();

  // Crear recursos
  console.log("📦 Creando recursos...");
  const [resource1, resource2] = await db
    .insert(resources)
    .values([
      {
        ownerId: community1.id,
        title: "Huerto Urbano Comunitario",
        description: "Espacio para cultivo de vegetales orgánicos en la ciudad",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
      },
      {
        ownerId: community2.id,
        title: "Servidor de Desarrollo",
        description: "Acceso a servidor con herramientas de desarrollo y testing",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      },
    ])
    .returning();

  // Crear oferta
  console.log("🤝 Creando ofertas...");
  const [offer1] = await db
    .insert(offers)
    .values([
      {
        fromId: resource1.id,
        toId: resource2.id,
        status: "pending",
      },
    ])
    .returning();

  // Crear mensajes
  console.log("💬 Creando mensajes...");
  await db.insert(messages).values([
    {
      offerId: offer1.id,
      senderId: community1.id,
      content: "¡Hola! Me interesa mucho tu servidor de desarrollo. Nuestro huerto podría beneficiarse de una plataforma para gestionar las cosechas.",
    },
    {
      offerId: offer1.id,
      senderId: community2.id,
      content: "¡Perfecto! Nos encantaría colaborar. El servidor tiene todas las herramientas que necesitas. ¿Cuándo podríamos coordinar el acceso al huerto?",
    },
  ]);

  console.log("✅ Seed completado exitosamente!");
  console.log(`📊 Datos creados:
  - ${2} comunidades
  - ${2} recursos  
  - ${1} oferta
  - ${2} mensajes`);

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error en seed:", error);
  process.exit(1);
});