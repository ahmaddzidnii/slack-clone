import { useCallback, useMemo, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwOnError?: boolean;
};

type RequestType = { id: Id<"workspaces">; name: string };
type ResponseType = Doc<"workspaces"> | null;

export const useUpdateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<"succsess" | "error" | "settled" | "pending" | null>(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "succsess", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.update);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        const response = await mutation(values);
        setError(null);
        setStatus("succsess");
        setData(response);

        options?.onSuccess?.(response);
      } catch (error) {
        setStatus("error");
        setError(error as Error);
        options?.onError?.(error as Error);
        if (options?.throwOnError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isError,
    isPending,
    isSuccess,
    isSettled,
  };
};
