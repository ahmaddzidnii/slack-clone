import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PreferencesModal } from "./preferences-modal";

import { Doc } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { InviteModal } from "./invite-modal";

interface WorkspaceHeaderProps {
  worspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({ worspace, isAdmin }: WorkspaceHeaderProps) => {
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <>
      <InviteModal
        name={worspace.name}
        joinCode={worspace.joinCode}
        open={inviteModalOpen}
        setOpen={setInviteModalOpen}
      />
      <PreferencesModal
        open={preferencesModalOpen}
        setOpen={setPreferencesModalOpen}
        initialValues={worspace.name}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden "
              size="sm"
              variant="transparant"
            >
              <span className="truncate">{worspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="start"
            className="w-64"
          >
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                {worspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start ">
                <p className="font-bold">{worspace.name}</p>
                <p className="text-xs text-muted-foreground">Active workspace</p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setInviteModalOpen(true)}
                >
                  Invite people to {worspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setPreferencesModalOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint
            label="Filter"
            side="bottom"
          >
            <Button
              variant="transparant"
              size="iconSm"
            >
              <ListFilter className="size-4" />
            </Button>
          </Hint>
          <Hint
            label="New messages"
            side="bottom"
          >
            <Button
              variant="transparant"
              size="iconSm"
            >
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
