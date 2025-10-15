import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers } from "@tabler/icons-react";

import data from "@/app/dashboard/data.json";

export function PartnersList() {
  const { allPartners } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconUsers className="size-5" />
          Todos os Parceiros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
          {allPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
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
                  {partner.totalSales.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant={
                      partner.status === "ativo" ? "default" : "secondary"
                    }
                  >
                    {partner.status}
                  </Badge>
                  <span className="text-muted-foreground text-xs">
                    {partner.joinDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
