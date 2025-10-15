import {
  IconTrendingUp,
  IconTrendingDown,
  IconCalendar,
  IconUsers,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import data from "@/app/dashboard/data.json";

export function SectionCards() {
  const { metrics } = data;

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? IconTrendingUp : IconTrendingDown;
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Saldo Disponível</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R${" "}
            {metrics.saldoDisponivel.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(() => {
                const GrowthIcon = getGrowthIcon(
                  metrics.growthIndicators.saldoDisponivel
                );
                return (
                  <GrowthIcon
                    className={getGrowthColor(
                      metrics.growthIndicators.saldoDisponivel
                    )}
                  />
                );
              })()}
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Crescimento mensal{" "}
            <IconTrendingUp
              className={`size-4 ${getGrowthColor(metrics.growthIndicators.saldoDisponivel)}`}
            />
          </div>
          <div className="text-muted-foreground">Disponível para saque</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Vendas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R${" "}
            {metrics.totalVendas.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(() => {
                const GrowthIcon = getGrowthIcon(
                  metrics.growthIndicators.totalVendas
                );
                return (
                  <GrowthIcon
                    className={getGrowthColor(
                      metrics.growthIndicators.totalVendas
                    )}
                  />
                );
              })()}
              +15.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Excelente performance{" "}
            <IconTrendingUp
              className={`size-4 ${getGrowthColor(metrics.growthIndicators.totalVendas)}`}
            />
          </div>
          <div className="text-muted-foreground">Vendas acumuladas</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Vendas Hoje</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R${" "}
            {metrics.vendasHoje.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(() => {
                const GrowthIcon = getGrowthIcon(
                  metrics.growthIndicators.vendasHoje
                );
                return (
                  <GrowthIcon
                    className={getGrowthColor(
                      metrics.growthIndicators.vendasHoje
                    )}
                  />
                );
              })()}
              +5.7%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Dia produtivo{" "}
            <IconTrendingUp
              className={`size-4 ${getGrowthColor(metrics.growthIndicators.vendasHoje)}`}
            />
          </div>
          <div className="text-muted-foreground">Vendas do dia atual</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Indicados Diretos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.indicadosDiretos}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers
                className={getGrowthColor(
                  metrics.growthIndicators.indicadosDiretos
                )}
              />
              Ativos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Rede em crescimento{" "}
            <IconUsers
              className={`size-4 ${getGrowthColor(metrics.growthIndicators.indicadosDiretos)}`}
            />
          </div>
          <div className="text-muted-foreground">
            Parceiros indicados por você
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Próxima Lista</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.proximaLista}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar className="text-blue-600" />
              Em breve
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Próximo pagamento <IconCalendar className="size-4 text-blue-600" />
          </div>
          <div className="text-muted-foreground">Data de liberação</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Faturamento</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R${" "}
            {metrics.totalFaturamento.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(() => {
                const GrowthIcon = getGrowthIcon(
                  metrics.growthIndicators.totalFaturamento
                );
                return (
                  <GrowthIcon
                    className={getGrowthColor(
                      metrics.growthIndicators.totalFaturamento
                    )}
                  />
                );
              })()}
              +22.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Crescimento consistente{" "}
            <IconTrendingUp
              className={`size-4 ${getGrowthColor(metrics.growthIndicators.totalFaturamento)}`}
            />
          </div>
          <div className="text-muted-foreground">Faturamento total da rede</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ativos/Inativos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.ativos}/{metrics.inativos}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(() => {
                const GrowthIcon = getGrowthIcon(
                  metrics.growthIndicators.ativosInativos
                );
                return (
                  <GrowthIcon
                    className={getGrowthColor(
                      metrics.growthIndicators.ativosInativos
                    )}
                  />
                );
              })()}
              89% Ativos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Alta retenção{" "}
            <IconTrendingUp
              className={`size-4 ${getGrowthColor(metrics.growthIndicators.ativosInativos)}`}
            />
          </div>
          <div className="text-muted-foreground">Status dos parceiros</div>
        </CardFooter>
      </Card>
    </div>
  );
}
