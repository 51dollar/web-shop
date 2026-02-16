import type { FiltersDTO } from "@/app/types";
import { api } from "./axios";
import { ApiRoutes } from "./constants";

export const getFilters = async (): Promise<FiltersDTO> => {
  const { data } = await api.get<FiltersDTO>(ApiRoutes.FILTERS);
  return data;
};
