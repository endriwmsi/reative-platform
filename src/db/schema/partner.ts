import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const partner = pgTable("partner", {
  id: text("id").primaryKey(),

  referencedPartnerId: text("referenced_partner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  cpf: text("cpf").unique(),
  cnpj: text("cnpj").unique(),

  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),

  street: text("street").notNull(),
  number: text("number").notNull(),
  complement: text("complement").default(""),
  neighborhood: text("neighborhood").notNull(),
  city: text("city").notNull(),
  uf: text("uf").notNull(),
  cep: text("cep").notNull(),

  createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});