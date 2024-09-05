import { toast } from "sonner";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useCreateChannelsModal } from "../store/use-create-channels-modal";
import { Button } from "@/components/ui/button";
import { useCreateChannels } from "../api/use-create-channels";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const CreateChannelModal = () => {
  const [name, setName] = useState("");
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelsModal();

  const { mutate, isPending } = useCreateChannels();

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, workspaceId: workspaceId },
      {
        onSuccess: (data) => {
          toast.success(`Channel ${data?.name} created successfully`);
          // TODO: redirect to the new channel
          handleClose();
        },
        onError: () => {
          toast.error("Failed to create channel");
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            value={name}
            onChange={handleChange}
            disabled={isPending}
            placeholder="e.g. #marketing, #design, #random-only"
            required
            autoFocus
            minLength={3}
            maxLength={80}
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
