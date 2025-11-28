import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

import { Footer } from "@/components/footer";

const RootLayout = () => (
  <>
    <div className="min-h-dvh w-screen">
      <Outlet />
      <Footer />
    </div>
    {/* <TanStackRouterDevtools /> */}
    <Toaster theme="dark" />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
