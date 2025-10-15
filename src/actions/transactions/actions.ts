"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { transaction } from "@/db/schema/transaction";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getTransactions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const transactions = await db
    .select({
      id: transaction.id,
      description: transaction.description,
      valueInCents: transaction.valueInCents,
      category: transaction.category,
      date: transaction.date,
      type: transaction.type,
      status: transaction.status,
    })
    .from(transaction)
    .where(eq(transaction.userId, session.user.id));

  return transactions;
}

export async function getTransactionsById(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const transactions = await db
    .select({
      id: transaction.id,
      description: transaction.description,
      valueInCents: transaction.valueInCents,
      category: transaction.category,
      date: transaction.date,
      type: transaction.type,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    })
    .from(transaction)
    .where(eq(transaction.id, id));

  return transactions;
}

export async function createTransaction(data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  await db.insert(transaction).values({
    id: crypto.randomUUID(),
    userId: session.user.id,
    description: data.description,
    valueInCents: data.valueInCents,
    category: data.category,
    date: data.date,
    type: data.type,
    status: data.status,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function updateTransaction(id: string, data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  await db
    .update(transaction)
    .set({
      description: data.description,
      valueInCents: data.valueInCents,
      category: data.category,
      date: data.date,
      type: data.type,
      status: data.status,
      updatedAt: new Date(),
    })
    .where(eq(transaction.id, id));

  return null;
}

export async function deleteTransaction(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  await db.delete(transaction).where(eq(transaction.id, id));

  return null;
}
