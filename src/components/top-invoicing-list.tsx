import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconChartBar,
} from "@tabler/icons-react";

import data from "@/app/dashboard/data.json";

export function TopInvoicingList() {
  const { topInvoicing } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconChartBar className="size-5" />
          TOP 10 Faturamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
          {topInvoicing.map((partner, index) => (
            <div
              key={partner.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <Avatar className="size-10">
                  <AvatarImage
                    src={partner.avatar || "/placeholder.svg"}
                    alt={partner.name}
                  />
                  <AvatarFallback>
                    {partner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{partner.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {partner.email}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  R${" "}
                  {partner.invoicing.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <Badge variant="outline" className="mt-1">
                  {partner.growth > 0 ? (
                    <IconTrendingUp className="mr-1 size-3" />
                  ) : (
                    <IconTrendingDown className="mr-1 size-3" />
                  )}
                  {partner.growth > 0 ? "+" : ""}
                  {partner.growth}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
