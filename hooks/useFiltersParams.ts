import { PRICE_RANGE } from "@/app/types/price";
import { useSearchParams } from "next/navigation";

export const useFiltersParams = () => {
  const searchParams = useSearchParams();

  const getArray = (key: string): string[] => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value.split("-").filter(Boolean);
  };

  let priceFrom = PRICE_RANGE.min;
  let priceTo = PRICE_RANGE.max;

  const priceParam = searchParams.get("price");
  if (priceParam) {
    const parts = priceParam.split("-");
    priceFrom = Number(parts[0]) || PRICE_RANGE.min;
    priceTo = Number(parts[1]) || PRICE_RANGE.max;
  }

  return {
    priceFrom,
    priceTo,
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
