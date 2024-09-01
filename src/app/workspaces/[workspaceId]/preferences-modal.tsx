import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues: string;
}

export const PreferencesModal = ({ open, initialValues, setOpen }: PreferencesModalProps) => {
  const [value, setValue] = useState(initialValues);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="pb-4 px-5 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">Workspace name</p>
              <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
            </div>
            <p className="text-sm">{value}</p>
          </div>
          <button
            disabled={false}
            onClick={() => {}}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-500"
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold">Delete workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
