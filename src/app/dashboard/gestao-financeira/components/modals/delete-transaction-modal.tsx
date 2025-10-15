"use client";

import { IconTrash, IconAlertTriangle } from "@tabler/icons-react";
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
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTransaction,
  getTransactionsById,
} from "@/actions/transactions/actions";
import { formatCurrencyFromCents } from "@/lib/utils";

interface DeleteTransactionModalProps {
  transactionId: string;
  children?: React.ReactNode;
}

export function DeleteTransactionModal({
  transactionId,
  children,
}: DeleteTransactionModalProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const transaction = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: ({ queryKey }) => getTransactionsById(queryKey[1]),
  });

  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleDelete = () => {
    mutation.mutate(transactionId);
    setOpen(false);
  };

  // Simplificar acesso aos dados da transação
  const transactionData = transaction.data?.[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <IconAlertTriangle className="h-5 w-5" />
            Excluir Transação
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. A transação será permanentemente
            removida.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
            <div className="space-y-2">
              <h4 className="font-medium">Transação a ser excluída:</h4>
              <p className="text-muted-foreground text-sm">
                {transactionData?.description || "N/A"}
              </p>
              <p className="text-sm font-medium">
                Valor:{" "}
                {transactionData?.valueInCents
                  ? formatCurrencyFromCents(transactionData.valueInCents)
                  : "N/A"}
              </p>
              <p className="text-muted-foreground text-sm">
                Data:{" "}
                {transactionData?.date
                  ? new Date(transactionData.date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <IconTrash className="mr-2 h-4 w-4" />
            Excluir Transação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
