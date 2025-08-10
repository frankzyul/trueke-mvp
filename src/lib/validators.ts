import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const createResourceSchema = z.object({
  ownerId: z.string().uuid("ID de comunidad inválido"),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  image: z.string().url().optional(),
});

export const createOfferSchema = z.object({
  fromId: z.string().uuid("ID de recurso origen inválido"),
  toId: z.string().uuid("ID de recurso destino inválido"),
});

export const createMessageSchema = z.object({
  offerId: z.string().uuid("ID de oferta inválido"),
  senderId: z.string().uuid("ID de emisor inválido"),
  content: z.string().min(1, "El contenido es requerido"),
});