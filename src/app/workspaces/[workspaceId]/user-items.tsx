import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemsVariants>["variant"];
}

export const UserItems = ({ id, image, label = "Member", variant }: UserItemsProps) => {
  const workspaceId = useWorkspaceId();

  const avatarFallback = label.charAt(0).toUpperCase();
  return (
    <Button
      variant="transparant"
      className={cn(userItemsVariants({ variant }))}
      size="sm"
      asChild
    >
      <Link href={`/workspaces/${workspaceId}/members/${id}`}>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage
            className="rounded-md "
            src={image}
          />
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
