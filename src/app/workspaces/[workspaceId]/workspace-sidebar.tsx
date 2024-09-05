import { HashIcon, Loader, MessageSquareText, SendHorizonal, TriangleAlert } from "lucide-react";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useCreateChannelsModal } from "@/features/channels/store/use-create-channels-modal";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";
import { UserItems } from "./user-items";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelsModal();

  const { data: member, isLoading: memberIsLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceIsLoading } = useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: channelsIsLoading } = useGetChannels({ workspaceId });
  const { data: members, isLoading: membersIsLoading } = useGetMembers({ workspaceId });

  if (memberIsLoading || workspaceIsLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="text-white size-5 animate-spin" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <TriangleAlert className="  size-5 text-white" />
        <p className="text-sm text-white"> Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        worspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem
          label="Threads"
          icon={MessageSquareText}
          id="threads"
        />
        <SidebarItem
          label="Drafts & Sent"
          icon={SendHorizonal}
          id="drafts"
        />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((c) => (
          <SidebarItem
            key={c._id}
            icon={HashIcon}
            label={c.name}
            id={c._id}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="Direct message"
        onNew={() => console.log("new channel")}
      >
        {members?.map((m) => (
          <UserItems
            key={m._id}
            id={m._id}
            label={m.user.name}
            image={m.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
