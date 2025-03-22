import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import ProtectedRoute from "@/components/protected-route";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "350px",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <ProtectedRoute>{children}</ProtectedRoute>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
