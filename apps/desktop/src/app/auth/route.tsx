import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { Layout } from "@/components/layout";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout.Container>
      <div className="space-y-6">
        <Link
          className="flex items-center gap-2 text-sm max-w-[400px] mx-auto"
          to="/"
        >
          <ArrowLeftIcon className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Voltar</span>
        </Link>
        <Layout.Card className="p-12 max-w-[400px] mx-auto">
          <Outlet />
        </Layout.Card>
      </div>
    </Layout.Container>
  );
}
