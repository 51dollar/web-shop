import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useFiltersUrlSync = (
  prices: { priceFrom: number; priceTo: number },
  selected: Record<string, string[]>,
) => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (prices.priceFrom) params.set("priceFrom", String(prices.priceFrom));

      if (prices.priceTo) params.set("priceTo", String(prices.priceTo));

      Object.entries(selected).forEach(([key, values]) => {
        values.forEach((v) => params.append(key, v));
      });

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [prices, selected, router]);
};
