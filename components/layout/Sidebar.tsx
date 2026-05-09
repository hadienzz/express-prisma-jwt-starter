"use client";

import Link from "next/link";
import {
  IconFiles,
  IconFileText,
  IconFolder,
  IconLayoutDashboard,
  IconSettings,
} from "@tabler/icons-react";

import Logo from "@/components/dockit/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Projects", href: "/project/e-commerce-redesign", icon: IconFolder },
  { label: "Templates", href: "/project/new/documents", icon: IconFileText },
  { label: "Documents", href: "/project/e-commerce-redesign", icon: IconFiles },
  { label: "Settings", href: "/dashboard", icon: IconSettings },
];

type SidebarProps = {
  currentPath: string;
  onNavigate?: () => void;
};

const Sidebar = ({ currentPath, onNavigate }: SidebarProps) => {
  return (
    <aside className="flex h-full w-60 flex-col border-r-[0.5px] border-dockit-border bg-dockit-secondary">
      <div className="p-5">
        <Logo href="/dashboard" />
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "mb-1 flex h-9 w-full items-center gap-3 rounded-md px-3 text-[14px] text-dockit-muted transition-colors duration-150 ease-in-out hover:bg-dockit-hover hover:text-dockit-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue",
                isActive &&
                  "border-l-2 border-dockit-blue bg-dockit-hover pl-[10px] text-dockit-heading",
              )}
            >
              <Icon className="size-4" stroke={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t-[0.5px] border-dockit-border p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-dockit-heading text-[13px] font-medium text-white">
            RP
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium text-dockit-heading">
              Rizky Pratama
            </p>
            <p className="text-[12px] text-dockit-muted">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
