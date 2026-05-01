import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useAsyncResource<T>(loader: () => Promise<T>, dependencies: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const load = useCallback(async () => {
    setState((current) => ({ ...current, error: null, isLoading: true }));

    try {
      const data = await loader();
      setState({ data, error: null, isLoading: false });
    } catch (error) {
      setState({
        data: null,
        error: error instanceof Error ? error.message : "Something went wrong",
        isLoading: false,
      });
    }
  }, dependencies);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, reload: load };
}
