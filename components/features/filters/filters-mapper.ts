import type { FiltersDTO, FilterCheckboxProps, UIFilters } from "@/app/types";

export const mapToCheckboxItems = (
  values?: (string | number)[],
): FilterCheckboxProps[] =>
  values?.map((value) => ({
    text: String(value),
    value: String(value),
  })) ?? [];

export const mapFiltersToUI = (filters: FiltersDTO | null): UIFilters => {
  if (!filters) {
    return {
      displaySizeItems: [],
      displayTypeItems: [],
      ramItems: [],
      osItems: [],
      processorItems: [],
      storageItems: [],
      colorItems: [],
    };
  }

  return {
    displaySizeItems: mapToCheckboxItems(filters.specifications.displaySize),
    displayTypeItems: mapToCheckboxItems(filters.specifications.displayType),
    ramItems: mapToCheckboxItems(filters.specifications.ram),
    osItems: mapToCheckboxItems(filters.specifications.os),
    processorItems: mapToCheckboxItems(filters.specifications.processor),
    storageItems: mapToCheckboxItems(filters.storage),
    colorItems: mapToCheckboxItems(filters.colors),
  };
};
