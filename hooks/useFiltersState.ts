import { useState } from "react";
import { useFiltersParams } from "./";

export const useFiltersState = () => {
  const params = useFiltersParams();

  const [prices, setPrices] = useState({
    priceFrom: params.priceFrom,
    priceTo: params.priceTo,
  });

  const [selected, setSelected] = useState({
    models: params.models,
    color: params.color,
    storage: params.storage,
    ram: params.ram,
    os: params.os,
    processor: params.processor,
    displayType: params.displayType,
    displaySize: params.displaySize,
  });

  const toggle = (group: keyof typeof selected, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter((v) => v !== value)
        : [...prev[group], value],
    }));
  };

  return {
    prices,
    setPrices,
    selected,
    toggle,
  };
};
