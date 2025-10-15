import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  phone: text("phone").notNull(),
  referencedBy: text("referenced_by"),

  image: text("image"),

  cpf: text("cpf").notNull(),
  cnpj: text("cnpj").notNull().unique(),

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
