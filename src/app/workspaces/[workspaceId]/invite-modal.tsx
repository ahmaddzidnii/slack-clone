import { toast } from "sonner";
import { CopyIcon, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirm";

interface InviteModalProps {
  open: boolean;
  name: string;
  joinCode: string;
  setOpen: (open: boolean) => void;
}

export const InviteModal = ({ open, name, joinCode, setOpen }: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to generate a new code?",
    "This will invalidate the current code and you will need to share the new code with your team again"
  );

  const { mutate, isPending } = useNewJoinCode();

  const handleNewCode = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("New code generated");
        },
        onError: () => {
          toast.error("Failed to regenerate new code");
        },
      }
    );
  };

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => toast.success("Link copied to clipboard"));
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>Use code below to invite people to {name}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center flex-col gap-y-4 items-center py-10">
            <p className="text-4xl tracking-widest font-bold uppercase">{joinCode}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
            >
              Copy link
              <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isPending}
              variant="outline"
              onClick={handleNewCode}
            >
              <RefreshCcw className="size-4 mr-2" />
              New code
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
