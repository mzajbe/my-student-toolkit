import Navbar from "@/components/navbar/Navbar";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      
      <main className="flex-1">
        {/* Sidebar toggle button */}
        <div className="p-2">
          <SidebarTrigger />
        </div>

        {/* Your routed pages */}
        <Outlet />
      </main>
      <Navbar></Navbar>
    </SidebarProvider>
  );
};

export default RootLayout;
