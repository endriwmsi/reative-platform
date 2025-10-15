"use client";

import type * as React from "react";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCalendar,
  IconUser,
  IconTag,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Transaction } from "@/app/dashboard/gestao-financeira/components/transaction-table";

interface TransactionModalProps {
  transaction: Transaction;
  children: React.ReactNode;
}

export function TransactionModal({
  transaction,
  children,
}: TransactionModalProps) {
  const isIncome = transaction.valueInCents > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isIncome ? (
              <IconTrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <IconTrendingDown className="h-5 w-5 text-red-600" />
            )}
            Detalhes da Transação
          </DialogTitle>
          <DialogDescription>
            Informações completas sobre esta transação
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Descrição</h4>
            <p className="text-muted-foreground text-sm">
              {transaction.description}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-medium">
                <IconTrendingUp className="h-4 w-4" />
                Valor
              </h4>
              <p
                className={`text-lg font-bold ${isIncome ? "text-green-600" : "text-red-600"}`}
              >
                R${" "}
                {Math.abs(transaction.valueInCents).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-medium">
                <IconTag className="h-4 w-4" />
                Categoria
              </h4>
              <Badge variant="outline">{transaction.category}</Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-medium">
                <IconCalendar className="h-4 w-4" />
                Data
              </h4>
              <p className="text-muted-foreground text-sm">
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Status</h4>
              <Badge
                variant={
                  transaction.status === "completed" ? "default" : "secondary"
                }
              >
                {transaction.status === "completed" ? "Concluído" : "Pendente"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="flex items-center gap-2 font-medium">
              <IconUser className="h-4 w-4" />
              {isIncome ? "Cliente" : "Fornecedor"}
            </h4>
            <p className="text-muted-foreground text-sm">
              {transaction.status}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
