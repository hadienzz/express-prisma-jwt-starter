"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IconMenu2 } from "@tabler/icons-react";

import Sidebar from "@/components/layout/Sidebar";
import { useSidebarDrawer } from "@/hooks/dockit/use-sidebar-drawer";

type AppShellProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
};

const AppShell = ({ title, subtitle, action, children }: AppShellProps) => {
  const pathname = usePathname();
  const sidebar = useSidebarDrawer();

  return (
    <div className="min-h-screen bg-white text-dockit-text">
      <div className="fixed inset-y-0 left-0 z-30 hidden w-60 lg:block">
        <Sidebar currentPath={pathname} />
      </div>

      {sidebar.isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-dockit-overlay"
            onClick={sidebar.close}
          />
          <div className="absolute inset-y-0 left-0 w-60">
            <Sidebar currentPath={pathname} onNavigate={sidebar.close} />
          </div>
        </div>
      )}

      <main className="min-h-screen lg:ml-60">
        <div className="px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <button
                type="button"
                aria-label="Open sidebar"
                onClick={sidebar.open}
                className="mt-1 grid size-9 shrink-0 place-items-center rounded-md border-[0.5px] border-dockit-border bg-white text-dockit-heading transition-colors duration-150 hover:bg-dockit-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue lg:hidden"
              >
                <IconMenu2 className="size-5" stroke={1.8} />
              </button>
              <div>
                <h1 className="text-[28px] font-medium leading-tight text-dockit-heading sm:text-[32px]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-2 text-[15px] leading-6 text-dockit-muted">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default AppShell;
