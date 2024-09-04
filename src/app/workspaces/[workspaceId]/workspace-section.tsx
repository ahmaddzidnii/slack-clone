import { useToggle } from "react-use";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface workspaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew: () => void;
}

export const WorkspaceSection = ({ children, label, hint, onNew }: workspaceSectionProps) => {
  const [on, toggle] = useToggle(true);
  return (
    <div className="flex flex-col mt-3 px-2 ">
      <div className="flex items-center px-3.5 group">
        <Button
          onClick={toggle}
          className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
          variant="transparant"
        >
          <FaCaretDown className={cn("size-4 transition-transform", on && "-rotate-90")} />
        </Button>
        <Button
          variant="transparant"
          size="sm"
          className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint
            label={hint}
            side="top"
            align="center"
          >
            <Button
              onClick={onNew}
              variant="transparant"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm size-6 shrink-0 text-[#f9edffcc]"
              size="iconSm"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
