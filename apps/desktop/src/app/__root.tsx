import { createRootRoute, Outlet } from "@tanstack/react-router";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "sonner";

import { Footer } from "@/components/footer";

const RootLayout = () => (
  <CookiesProvider>
    <div className="min-h-dvh w-screen">
      <Outlet />
      <Footer />
    </div>
    {/* <TanStackRouterDevtools /> */}
    <Toaster theme="dark" />
  </CookiesProvider>
);

export const Route = createRootRoute({ component: RootLayout });
