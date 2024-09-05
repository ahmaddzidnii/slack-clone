"use client";

import Image from "next/image";
import Link from "next/link";
import VerificationInput from "react-verification-input";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { useJoin } from "@/features/workspaces/api/use-join";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";

const JoinPage = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { mutate, isPending } = useJoin();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

  const isMember = useMemo(() => data?.isMember, [data]);

  useEffect(() => {
    if (isMember) {
      router.replace(`/workspaces/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  const handleComplete = (code: string) => {
    mutate(
      {
        joinCode: code,
        workspaceId,
      },
      {
        onSuccess(data) {
          toast.success(`Successfully joined ${data?.name}`);
          router.replace(`/workspaces/${data?.id}`);
        },
        onError() {
          toast.error("failed to join workspace");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image
        src="/icon.png"
        width={60}
        height={60}
        alt="Logo"
      />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-md text-muted-foreground"> Enter workspace code to join</p>
        </div>
        <VerificationInput
          classNames={{
            container: cn("flex  gap-x-2 ", isPending && "cursor-not-allowed opacity-50"),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
          length={6}
          onComplete={handleComplete}
        />
      </div>
      <div className="flex gap-x-4">
        <Button
          size="lg"
          variant="outline"
          asChild
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
