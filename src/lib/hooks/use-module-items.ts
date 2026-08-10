
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api/client";

/**
 * Fetches the items of a generic admin content module (keyed by DB table name)
 * and exposes a `reload` for the CRUD manager to refetch after mutations.
 */
export function useModuleItems<T>(module: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.listModule(module);
      setItems((res.items as T[]) ?? []);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [module]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { items, loading, error, reload };
}
