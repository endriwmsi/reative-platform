import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

// Enums para transações
export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "outcome",
]);
export const transactionStatusEnum = pgEnum("transaction_status", [
  "completed",
  "pending",
  "cancelled",
]);

export const transaction = pgTable("transaction", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  description: text("description").notNull(),
  valueInCents: integer("value_in_cents").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").notNull(),
  status: transactionStatusEnum("status").notNull(),
  type: transactionTypeEnum("type").notNull(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
