"use server";

import { auth, ErrorCode } from "@/auth";
import { registerSchema } from "@/components/auth-forms/schemas/register-schemas";
import {
  isValidCPF,
  isValidCNPJ,
  cleanCPF,
  cleanCNPJ,
} from "@/lib/cpf-cnpj-validator";
import { db } from "@/db/client";
import { user } from "@/db/schema";
import { APIError } from "better-auth/api";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

type registerSchema = z.infer<typeof registerSchema>;

export async function signUpEmailAction(data: registerSchema) {
  try {
    const cleanedCPF = cleanCPF(data.cpf);
    const cleanedCNPJ = cleanCNPJ(data.cnpj);

    const isCPFValid = isValidCPF(cleanedCPF);
    const isCNPJValid = isValidCNPJ(cleanedCNPJ);

    if (!isCPFValid) {
      return {
        error: "CPF inválido. Verifique os dígitos informados.",
      };
    }

    if (!isCNPJValid) {
      return {
        error: "CNPJ inválido. Verifique os dígitos informados.",
      };
    }

    const existingUser = await db
      .select({
        id: user.id,
        email: user.email,
        cpf: user.cpf,
        cnpj: user.cnpj,
      })
      .from(user)
      .where(
        or(
          eq(user.email, data.email),
          eq(user.cpf, cleanedCPF),
          eq(user.cnpj, cleanedCNPJ)
        )
      )
      .limit(1);

    if (existingUser.length > 0) {
      const user = existingUser[0];

      if (user.email === data.email) {
        return { error: "Este e-mail já está sendo usado por outro usuário." };
      }

      if (user.cpf === cleanedCPF) {
        return { error: "Este CPF já está sendo usado por outro usuário." };
      }

      if (user.cnpj === cleanedCNPJ) {
        return { error: "Este CNPJ já está sendo usado por outro usuário." };
      }
    }

    await auth.api.signUpEmail({
      body: {
        name: data.fullname,
        email: data.email,
        password: data.password,
        phone: data.phone,
        cpf: cleanedCPF,
        cnpj: cleanedCNPJ,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        uf: data.state,
        cep: data.cep,
      },
    });

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! E-mail já cadastrado" };
        default:
          return { error: error.message };
      }
    }

    console.log(error);

    return { error: "Erro de servidor Interno." };
  }

  return { error: null };
}
