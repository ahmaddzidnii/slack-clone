import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const userItemsVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481439] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserItemsProps {
  userId: Id<"users">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemsVariants>["variant"];
}

export const userItems = ({ userId, image, label = "Member", variant }: UserItemsProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      variant="transparant"
      className={cn(userItemsVariants({ variant }))}
      size="sm"
      asChild
    >
      <Link href={`/workspaces/${workspaceId}/members/${userId}`}></Link>
    </Button>
  );
};
