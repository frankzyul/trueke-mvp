import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum("status", ["pending", "accepted", "rejected"]);

export const communities = pgTable("communities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").notNull().references(() => communities.id),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const offers = pgTable("offers", {
  id: uuid("id").primaryKey().defaultRandom(),
  fromId: uuid("from_id").notNull().references(() => resources.id),
  toId: uuid("to_id").notNull().references(() => resources.id),
  status: statusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  offerId: uuid("offer_id").notNull().references(() => offers.id),
  senderId: uuid("sender_id").notNull().references(() => communities.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const communitiesRelations = relations(communities, ({ many }) => ({
  resources: many(resources),
  messages: many(messages),
}));

export const resourcesRelations = relations(resources, ({ one, many }) => ({
  owner: one(communities, {
    fields: [resources.ownerId],
    references: [communities.id],
  }),
  offersFrom: many(offers, { relationName: "fromResource" }),
  offersTo: many(offers, { relationName: "toResource" }),
}));

export const offersRelations = relations(offers, ({ one, many }) => ({
  fromResource: one(resources, {
    fields: [offers.fromId],
    references: [resources.id],
    relationName: "fromResource",
  }),
  toResource: one(resources, {
    fields: [offers.toId],
    references: [resources.id],
    relationName: "toResource",
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  offer: one(offers, {
    fields: [messages.offerId],
    references: [offers.id],
  }),
  sender: one(communities, {
    fields: [messages.senderId],
    references: [communities.id],
  }),
}));

// Types
export type Community = typeof communities.$inferSelect;
export type NewCommunity = typeof communities.$inferInsert;
export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;