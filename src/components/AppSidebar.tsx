import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  History,
  AlertTriangle,
  Settings,
  Fuel
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "History & Logs", url: "/history", icon: History },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar
      collapsible="icon"
    >

      <SidebarContent>
        {/* Header and Navigation together */}
        <div className={`p-4 pb-2 border-b border-border ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Fuel className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sm font-semibold text-foreground">BIOGAS</h2>
                <p className="text-xs text-muted-foreground">Real-time Monitoring</p>
              </div>
            )}
          </div>
          {/* Navigation menu right below header, no gap */}
          <div className="mt-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={({ isActive }) => getNavClass({ isActive })}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </div>

        {/* System Status in Sidebar */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">System Online</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}