"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { IconEdit } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  transactionSchema,
  type TransactionFormData,
} from "@/lib/schemas/transaction";
import { Transaction } from "../transaction-table";

interface EditTransactionModalProps {
  transaction: Transaction;
  children: React.ReactNode;
}

export function EditTransactionModal({
  transaction,
  children,
}: EditTransactionModalProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: transaction.description || "",
      valueInCents: transaction.valueInCents,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
      status: transaction.status,
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log(data);

    // updateMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconEdit className="h-5 w-5" />
            Editar Transação
          </DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias na transação
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* ... */}

            <div className="grid grid-cols-2 gap-4">{/* ... */}</div>

            <div className="grid grid-cols-2 gap-4">{/* ... */}</div>

            <div className="grid grid-cols-2 gap-4">{/* ... */}</div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              {/* <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
