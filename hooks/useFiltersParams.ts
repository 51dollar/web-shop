import { useSearchParams } from "next/navigation";

export const useFiltersParams = () => {
  const searchParams = useSearchParams();

  const getArray = (key: string) => searchParams.getAll(key);

  return {
    priceFrom: Number(searchParams.get("priceFrom")) || 0,
    priceTo: Number(searchParams.get("priceTo")) || 20000,
    models: getArray("models"),
    color: getArray("color"),
    storage: getArray("storage"),
    ram: getArray("ram"),
    os: getArray("os"),
    processor: getArray("processor"),
    displayType: getArray("displayType"),
    displaySize: getArray("displaySize"),
  };
};
