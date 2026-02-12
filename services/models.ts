import { api } from "./axios";
import { ApiRoutes } from "./constants";

export type ProductModel = {
  id: number;
  name: string;
};

export const getModels = async (): Promise<ProductModel[]> => {
  const { data } = await api.get<ProductModel[]>(ApiRoutes.PRODUCT_MODELS);

  return data;
};
