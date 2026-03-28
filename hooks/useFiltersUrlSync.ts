import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useFiltersUrlSync = (
  prices: { priceFrom: number; priceTo: number },
  selected: Record<string, string[]>,
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedString = useMemo(() => JSON.stringify(selected), [selected]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      params.set("price", `${prices.priceFrom}-${prices.priceTo}`);

      Object.entries(selected).forEach(([key, values]) => {
        if (values.length) {
          params.set(key, values.join("-"));
        }
      });

      const newUrl = params.toString();
      const currentUrl = searchParams.toString();

      if (newUrl === currentUrl) {
        return;
      }

      router.replace(`?${newUrl}`, { scroll: false });
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    selected,
    prices.priceFrom,
    prices.priceTo,
    selectedString,
    router,
    searchParams,
  ]);
};
