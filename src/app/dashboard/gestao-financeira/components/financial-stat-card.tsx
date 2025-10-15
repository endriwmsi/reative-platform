import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn, formatValue } from "@/lib/utils";

interface FinancialStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  valueColor?: "green" | "red" | "yellow" | "blue" | "default";
  trend?: string;
  className?: string;
  loading?: boolean;
}

export function FinancialStatCard({
  title,
  value,
  description,
  icon,
  valueColor = "default",
  trend,
  className,
  loading = false,
}: FinancialStatCardProps) {
  const getValueColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      case "yellow":
        return "text-yellow-600";
      case "blue":
        return "text-blue-600";
      default:
        return "text-foreground";
    }
  };

  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="bg-muted h-4 w-24 rounded"></div>
          <div className="bg-muted h-4 w-4 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted mb-2 h-8 w-32 rounded"></div>
          <div className="bg-muted h-3 w-40 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div
          className={cn("text-2xl font-bold", getValueColorClass(valueColor))}
        >
          {formatValue(value)}
        </div>
        <p className="text-muted-foreground text-xs">
          {trend && (
            <span
              className={cn(
                "mr-1 font-medium",
                trend.startsWith("+")
                  ? "text-green-600"
                  : trend.startsWith("-")
                    ? "text-red-600"
                    : "text-muted-foreground"
              )}
            >
              {trend}
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
