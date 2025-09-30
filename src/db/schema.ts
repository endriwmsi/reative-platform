import { relations } from "drizzle-orm";
import {
  text,
  timestamp,
  varchar,
  integer,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm"; // Comentado pois não está sendo usado no momento

// Tabela de usuários
export const userTable = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  phone: varchar("phone", { length: 50 }).notNull(),

  cpf: varchar("cpf", { length: 14 }).notNull().unique(),
  cnpj: varchar("cnpj", { length: 18 }).notNull().unique(),

  // Endereço
  street: varchar("street", { length: 255 }).notNull(),
  number: varchar("number", { length: 50 }).notNull(),
  complement: varchar("complement", { length: 255 }).default(""),
  neighborhood: varchar("neighborhood", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  uf: varchar("uf", { length: 2 }).notNull(),
  cep: varchar("cep", { length: 20 }).notNull(),

  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("account", {
  id: text("id").primaryKey(),

  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Relação de usuários → partnerTable que indicaram este usuário (se aplicável)
export const partnerTable = pgTable("partner", {
  id: text("id").primaryKey(),

  referenced_partner_id: text("referenced_partner_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),

  name: varchar("name", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 14 }).unique(),
  cnpj: varchar("cnpj", { length: 18 }).unique(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }).notNull(),

  street: varchar("street", { length: 255 }).notNull(),
  number: varchar("number", { length: 50 }).notNull(),
  complement: varchar("complement", { length: 255 }).default(""),
  neighborhood: varchar("neighborhood", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  uf: varchar("uf", { length: 2 }).notNull(),
  cep: varchar("cep", { length: 20 }).notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de transações
export const transactionTable = pgTable("transaction", {
  id: text("id").primaryKey(),

  user_id: text("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),

  partner_id: text("partner_id").references(() => partnerTable.id, {
    onDelete: "set null",
  }),

  description: text("description").notNull(),
  valueInCents: integer("value_in_cents").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  date: timestamp("date").notNull(),
  status: varchar("status", { length: 50 }).notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// As relações estão comentadas devido a problemas de compatibilidade com a versão atual do Drizzle ORM
// Para usar relações, você pode descomentar e ajustar conforme necessário:

export const usersRelations = relations(userTable, ({ many }) => ({
  partnerTableIndicados: many(partnerTable),
  transactions: many(transactionTable),
}));

export const partnerTableRelations = relations(
  partnerTable,
  ({ one, many }) => ({
    indicador: one(userTable, {
      fields: [partnerTable.referenced_partner_id],
      references: [userTable.id],
    }),
    transactions: many(transactionTable),
  })
);

export const transactionsRelations = relations(transactionTable, ({ one }) => ({
  usuario: one(userTable, {
    fields: [transactionTable.user_id],
    references: [userTable.id],
  }),
  parceiro: one(partnerTable, {
    fields: [transactionTable.partner_id],
    references: [partnerTable.id],
  }),
}));
