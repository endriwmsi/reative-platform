import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getValidDomains = () => {
  const domains = [
    "gmail.com",
    "outlook.com",
    "yahoo.com",
    "hotmail.com",
    "icloud.com",
    "gsrocket.com.br",
  ];

  return domains;
};

export const normalizeName = (name: string) => {
  return name
    .trim()
    .replace(/\s+g/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getUserInitials = (name: string) => {
  const nameParts = name.trim().split(/\s+/);
  const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  const lastInitial = nameParts[nameParts.length - 1]
    ? nameParts[nameParts.length - 1][0].toUpperCase()
    : "";
  return nameParts.length > 1 ? `${firstInitial}${lastInitial}` : firstInitial;
};

export const formatCurrency = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (!cleanValue) return "";

  const numberValue = parseInt(cleanValue) / 100;

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseCurrencyToNumber = (formattedValue: string): number => {
  const cleanValue = formattedValue
    .replace(/[R$\s]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(cleanValue) || 0;
};

export const formatValue = (val: string | number) => {
  if (typeof val === "number") {
    return `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }
  return val;
};

export const formatCurrencyFromCents = (valueInCents: number): string => {
  const value = Math.abs(valueInCents) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função para formatar data para input tipo date (YYYY-MM-DD)
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Função para converter centavos para valor decimal
export const formatAmountFromCents = (valueInCents: number): number => {
  return valueInCents / 100;
};

// Função para converter valor decimal para centavos
export const convertAmountToCents = (amount: number): number => {
  return Math.round(amount * 100);
};
