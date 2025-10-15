"use client";

import {
  IconTrendingUp,
  IconTrendingDown,
  IconCreditCard,
  IconWallet,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialStatCard } from "@/app/dashboard/gestao-financeira/components/financial-stat-card";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/actions/transactions/actions";
import { TransactionTable } from "@/app/dashboard/gestao-financeira/components/transaction-table";

export default function GestaoFinanceiraPage() {
  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const transactions = transactionsQuery.data || [];

  // Funções utilitárias para cálculos de período
  const getCurrentMonth = () => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
    };
  };

  const getPreviousMonth = () => {
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return {
      year: prevMonth.getFullYear(),
      month: prevMonth.getMonth(),
    };
  };

  const filterTransactionsByMonth = (
    transactions: any[],
    year: number,
    month: number
  ) => {
    return transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month
      );
    });
  };

  const calculateTrend = (
    currentValue: number,
    previousValue: number
  ): string => {
    if (previousValue === 0 && currentValue === 0) {
      return "0%";
    }

    if (previousValue === 0) {
      return currentValue > 0 ? "+100%" : "0%";
    }

    const percentageChange =
      ((currentValue - previousValue) / previousValue) * 100;

    const limitedChange = Math.min(Math.max(percentageChange, -99.9), 999.9);

    const sign = limitedChange >= 0 ? "+" : "";
    return `${sign}${limitedChange.toFixed(1)}%`;
  };

  // Dados do mês atual
  const currentMonth = getCurrentMonth();
  const currentMonthTransactions = filterTransactionsByMonth(
    transactions,
    currentMonth.year,
    currentMonth.month
  );

  // Dados do mês anterior
  const previousMonth = getPreviousMonth();
  const previousMonthTransactions = filterTransactionsByMonth(
    transactions,
    previousMonth.year,
    previousMonth.month
  );

  // Métricas do mês atual
  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.valueInCents / 100, 0);

  const totalOutcome = currentMonthTransactions
    .filter((t) => t.type === "outcome")
    .reduce((sum, t) => sum + Math.abs(t.valueInCents / 100), 0);

  const balance = totalIncome - totalOutcome;

  const pendingIncome = currentMonthTransactions
    .filter((t) => t.type === "income" && t.status === "pending")
    .reduce((sum, t) => sum + t.valueInCents / 100, 0);

  // Métricas do mês anterior
  const previousTotalIncome = previousMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.valueInCents / 100, 0);

  const previousTotalOutcome = previousMonthTransactions
    .filter((t) => t.type === "outcome")
    .reduce((sum, t) => sum + Math.abs(t.valueInCents / 100), 0);

  const previousBalance = previousTotalIncome - previousTotalOutcome;

  // Cálculo dos trends
  const incomeTrend = calculateTrend(totalIncome, previousTotalIncome);
  const outcomeTrend = calculateTrend(totalOutcome, previousTotalOutcome);
  const balanceTrend = calculateTrend(balance, previousBalance);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Transações</h1>
        <p className="text-muted-foreground">
          Controle completo das suas receitas e despesas
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FinancialStatCard
          title="Total de Receitas"
          value={totalIncome}
          description="em relação ao mês anterior"
          trend={incomeTrend}
          icon={<IconTrendingUp className="h-4 w-4 text-green-600" />}
          valueColor="green"
          loading={transactionsQuery.isLoading}
        />

        <FinancialStatCard
          title="Total de Despesas"
          value={totalOutcome}
          description="em relação ao mês anterior"
          trend={outcomeTrend}
          icon={<IconTrendingDown className="h-4 w-4 text-red-600" />}
          valueColor="red"
          loading={transactionsQuery.isLoading}
        />

        <FinancialStatCard
          title="Saldo Atual"
          value={balance}
          description="em relação ao mês anterior"
          trend={balanceTrend}
          icon={
            <IconWallet
              className={`h-4 w-4 ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
            />
          }
          valueColor={balance >= 0 ? "green" : "red"}
          loading={transactionsQuery.isLoading}
        />

        <FinancialStatCard
          title="Receitas Pendentes"
          value={pendingIncome}
          description="Aguardando confirmação"
          icon={<IconCreditCard className="h-4 w-4 text-yellow-600" />}
          valueColor="yellow"
          loading={transactionsQuery.isLoading}
        />
      </div>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transações</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsQuery.isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          ) : (
            <TransactionTable data={transactions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
