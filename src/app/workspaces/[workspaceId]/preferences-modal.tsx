import { toast } from "sonner";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues: string;
}

export const PreferencesModal = ({ open, initialValues, setOpen }: PreferencesModalProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(initialValues);

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete workspace",
    "Are you sure you want to delete this workspace?"
  );

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: (data) => {
          toast.success(`Worspace renamed to "${data?.name}"`);
          setOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to rename workspace");
          console.error(error);
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }

    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace removed");
          router.replace(`/`);
        },
        onError: (error) => {
          toast.error("Failed to remove workspace");
          console.error(error);
        },
      }
    );
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
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="pb-4 px-5 flex flex-col gap-y-2">
            <Dialog
              open={editOpen}
              onOpenChange={setEditOpen}
            >
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Workspace name</p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4"
                  onSubmit={handleEdit}
                >
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g. Marketing"
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={isUpdatingWorkspace}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={false}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-500"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
