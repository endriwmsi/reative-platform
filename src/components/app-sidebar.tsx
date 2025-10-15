"use client";

import type * as React from "react";
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  IconSettings,
  IconCreditCard,
  IconShoppingCart,
  IconEye,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Gestão Financeira",
      url: "#",
      icon: IconCreditCard,
      items: [
        {
          title: "Transações",
          url: "/dashboard/gestao-financeira",
        },
        {
          title: "Vendas",
          url: "/vendas",
        },
        {
          title: "Mensalidades",
          url: "/mensalidades",
        },
        {
          title: "Inadimplência",
          url: "/inadimplencia",
        },
      ],
    },
    {
      title: "Serviços e Produtos",
      url: "#",
      icon: IconShoppingCart,
      items: [
        {
          title: "Limpa Nome",
          url: "/limpa-nome",
        },
        {
          title: "CNH",
          url: "/cnh",
        },
        {
          title: "Rating PF",
          url: "/rating-pf",
        },
        {
          title: "Rating PJ",
          url: "/rating-pj",
        },
        {
          title: "Jus-Brasil e Escavador",
          url: "/jus-brasil",
        },
        {
          title: "Bacen",
          url: "/bacen",
        },
      ],
    },
    {
      title: "Consultas",
      url: "#",
      icon: IconEye,
      items: [
        {
          title: "Comprar Consultas",
          url: "/comprar-consultas",
        },
        {
          title: "Minhas Consultas",
          url: "/minhas-consultas",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
