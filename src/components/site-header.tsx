"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Bell, User, Settings, LogOut, Mail } from "lucide-react";
import { useState } from "react";
import { getUserInitials } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { ModeToggle } from "./mode-toggle";

const mockNotifications = [
  { id: 1, title: "New message received", time: "2 min ago", unread: true },
  { id: 2, title: "Project updated", time: "1 hour ago", unread: true },
  { id: 3, title: "Meeting reminder", time: "3 hours ago", unread: false },
  { id: 4, title: "Task completed", time: "1 day ago", unread: false },
];

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="text-muted-foreground p-4 text-center">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start gap-1 p-3"
                  >
                    <div className="flex w-full items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${notification.unread ? "bg-blue-500" : "bg-transparent"}`}
                      />
                      <span className="text-sm font-medium">
                        {notification.title}
                      </span>
                    </div>
                    <span className="text-muted-foreground ml-4 text-xs">
                      {notification.time}
                    </span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/*  Added user info dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  {session?.user.image && (
                    <AvatarImage
                      src={session?.user.image || "/assets/placeholder.svg"}
                      alt={session?.user.name || "User"}
                    />
                  )}
                  <AvatarFallback>
                    {getUserInitials(session?.user.name || "SN")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden max-w-40 flex-col items-start md:flex">
                  <span className="truncate text-sm font-medium">
                    {isPending ? "..." : session?.user.name || "Usuário"}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {isPending ? "" : session?.user.email}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Messages
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
