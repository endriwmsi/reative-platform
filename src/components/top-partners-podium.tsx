import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrophy, IconMedal, IconAward } from "@tabler/icons-react";

import data from "@/app/dashboard/data.json";

export function TopPartnersPodium() {
  const { topPartners } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTrophy className="size-5 text-yellow-500" />
          TOP 3 Parceiros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-end justify-center gap-4">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <Avatar className="mb-2 size-16">
              <AvatarImage
                src={topPartners[1].avatar || "/placeholder.svg"}
                alt={topPartners[1].name}
              />
              <AvatarFallback>
                {topPartners[1].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="mb-2 text-center">
              <p className="text-sm font-semibold">{topPartners[1].name}</p>
              <p className="text-muted-foreground text-xs">
                R${" "}
                {topPartners[1].totalSales.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="flex h-16 w-20 items-center justify-center rounded-t-lg bg-gray-300 dark:bg-gray-600">
              <div className="text-center">
                <IconMedal className="mx-auto mb-1 size-6 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-bold">2°</span>
              </div>
            </div>
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center">
            <Avatar className="mb-2 size-20">
              <AvatarImage
                src={topPartners[0].avatar || "/placeholder.svg"}
                alt={topPartners[0].name}
              />
              <AvatarFallback>
                {topPartners[0].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="mb-2 text-center">
              <p className="font-semibold">{topPartners[0].name}</p>
              <p className="text-muted-foreground text-sm">
                R${" "}
                {topPartners[0].totalSales.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <Badge variant="outline" className="mt-1">
                +{topPartners[0].growth}%
              </Badge>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-t-lg bg-yellow-400 dark:bg-yellow-500">
              <div className="text-center">
                <IconTrophy className="mx-auto mb-1 size-8 text-yellow-800" />
                <span className="text-lg font-bold text-yellow-800">1°</span>
              </div>
            </div>
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center">
            <Avatar className="mb-2 size-14">
              <AvatarImage
                src={topPartners[2].avatar || "/placeholder.svg"}
                alt={topPartners[2].name}
              />
              <AvatarFallback>
                {topPartners[2].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="mb-2 text-center">
              <p className="text-sm font-semibold">{topPartners[2].name}</p>
              <p className="text-muted-foreground text-xs">
                R${" "}
                {topPartners[2].totalSales.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="flex h-12 w-20 items-center justify-center rounded-t-lg bg-amber-600 dark:bg-amber-700">
              <div className="text-center">
                <IconAward className="mx-auto mb-1 size-5 text-amber-100" />
                <span className="text-sm font-bold text-amber-100">3°</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
