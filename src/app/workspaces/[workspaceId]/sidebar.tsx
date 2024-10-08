import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";

import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-swticher";
import { SidebarButton } from "./sidebar-button";

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col items-center gap-y-4 pt-[9px] pb-4">
      <div className="space-y-2 flex flex-col items-center">
        <WorkspaceSwitcher />
        <SidebarButton
          icon={Home}
          label="Home"
          isActive
        />
        <SidebarButton
          icon={MessagesSquare}
          label="DMs"
        />
        <SidebarButton
          icon={Bell}
          label="Activity"
        />
        <SidebarButton
          icon={MoreHorizontal}
          label="More"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
