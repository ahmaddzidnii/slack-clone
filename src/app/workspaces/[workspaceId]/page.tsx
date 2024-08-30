"use client";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useGetWorkspace({ id: workspaceId });
  return <div>{JSON.stringify(data)}</div>;
};

export default WorkspaceIdPage;
