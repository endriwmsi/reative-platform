import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  valueInCents: z.number().min(1, "Valor é obrigatório"),
  type: z.enum(["income", "outcome"], {
    message: "Tipo é obrigatório",
  }),
  category: z.string().min(1, "Categoria é obrigatória"),
  status: z.enum(["completed", "pending", "cancelled"], {
    message: "Status é obrigatório",
  }),
  client: z.string().min(1, "Cliente/Fornecedor é obrigatório"),
  date: z.date().min(1, "Data é obrigatória"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
