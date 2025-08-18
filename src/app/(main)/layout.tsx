import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="mt-12 p-10 text-foreground font-semibold border-border">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
