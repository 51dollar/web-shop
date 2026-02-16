"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

type FilterGroup =
  | "models"
  | "color"
  | "storage"
  | "ram"
  | "os"
  | "processor"
  | "displayType"
  | "displaySize";

const MIN = 0;
const MAX = 20000;

export const useFiltersState = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [prices, setPrices] = useState({
    priceFrom: Number(searchParams.get("priceFrom")) || MIN,
    priceTo: Number(searchParams.get("priceTo")) || MAX,
  });

  const [selected, setSelected] = useState<Record<FilterGroup, Set<string>>>(
    () => ({
      models: new Set(searchParams.getAll("models")),
      color: new Set(searchParams.getAll("color")),
      storage: new Set(searchParams.getAll("storage")),
      ram: new Set(searchParams.getAll("ram")),
      os: new Set(searchParams.getAll("os")),
      processor: new Set(searchParams.getAll("processor")),
      displayType: new Set(searchParams.getAll("displayType")),
      displaySize: new Set(searchParams.getAll("displaySize")),
    }),
  );


  const toggle = (group: FilterGroup, value: string) => {
    setSelected((prev) => {
      const current = new Set(prev[group]);
      current.has(value) ? current.delete(value) : current.add(value);

      return { ...prev, [group]: current };
    });
  };


  useEffect(() => {
    const query = qs.stringify(
      {
        priceFrom: prices.priceFrom,
        priceTo: prices.priceTo,
        models: Array.from(selected.models ),
        color: Array.from(selected.color),
        storage: Array.from(selected.storage),
        ram: Array.from(selected.ram),
        os: Array.from(selected.os),
        processor: Array.from(selected.processor),
        displayType: Array.from(selected.displayType),
        displaySize: Array.from(selected.displaySize),
      },
      { arrayFormat: "repeat" },
    );

    router.replace(`?${query}`, { scroll: false });
  }, [prices, selected, router]);

  return {
    prices,
    setPrices,
    selected,
    toggle,
  };
};
