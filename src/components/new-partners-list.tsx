import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUserPlus } from "@tabler/icons-react";

import data from "@/app/dashboard/data.json";

export function NewPartnersList() {
  const { newPartners } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconUserPlus className="size-5" />
          Novos Parceiros (Código PART001)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {newPartners.map((partner) => (
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
                <p className="text-sm font-medium">{partner.joinDate}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {partner.referralCode}
                  </Badge>
                  <Badge
                    variant={
                      partner.status === "ativo" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {partner.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
