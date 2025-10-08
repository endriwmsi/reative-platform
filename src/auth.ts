import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getValidDomains, normalizeName } from "./lib/utils";
import { sendEmailAction } from "./actions/mail/send-email.action";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Redefinir senha",
        meta: {
          description: "Clique no link abaixo para redefinir sua senha.",
          link: String(url),
        },
      });
    },
  },

  user: {
    additionalFields: {
      cpf: { type: "string", required: true },
      cnpj: { type: "string", required: true },
      phone: { type: "string", required: true },
      street: { type: "string", required: true },
      number: { type: "string", required: true },
      complement: { type: "string", required: true },
      neighborhood: { type: "string", required: true },
      city: { type: "string", required: true },
      uf: { type: "string", required: true },
      cep: { type: "string", required: true },
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,

    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verifique seu e-mail",
        meta: {
          description:
            "Por favor, clique no link abaixo para verificar seu e-mail.",
          link: String(link),
        },
      });
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        const VALID_DOMAINS = getValidDomains();

        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Domínio inválido. Por favor, use um domínio válido.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  session: {
    expiresIn: 60 * 60 * 24,
  },
  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
