import type { Product } from "@/lib/generated/prisma-client";
import { api } from "./axios";
import { ApiRoutes } from "./constants";

export const search = async (
    query: string,
    signal?: AbortSignal 
): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
    ...(signal ? { signal } : {}),
  });

  return data;
};
