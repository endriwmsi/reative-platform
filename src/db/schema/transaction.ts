import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { partner } from "./partner";

export const transaction = pgTable("transaction", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()  
    .references(() => user.id, { onDelete: "cascade" }),

  partnerId: text("partner_id").references(() => partner.id, {
    onDelete: "set null",
  }),

  description: text("description").notNull(),
  valueInCents: integer("value_in_cents").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  date: timestamp("date").notNull(),
  status: varchar("status", { length: 50 }).notNull(),

  createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});