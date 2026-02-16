import type { FiltersDTO, FilterCheckboxProps } from "@/app/types";

export interface UIFilters {
  modelItems: FilterCheckboxProps[];
  colorItems: FilterCheckboxProps[];
  storageItems: FilterCheckboxProps[];
  ramItems: FilterCheckboxProps[];
  osItems: FilterCheckboxProps[];
  processorItems: FilterCheckboxProps[];
  displaySizeItems: FilterCheckboxProps[];
  displayTypeItems: FilterCheckboxProps[];
}

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
      modelItems: [],
      colorItems: [],
      storageItems: [],
      ramItems: [],
      osItems: [],
      processorItems: [],
      displaySizeItems: [],
      displayTypeItems: [],
    };
  }

  return {
    modelItems: filters.models.map((m) => ({
      text: m.name,
      value: String(m.id),
    })),

    colorItems: mapToCheckboxItems(filters.colors),
    storageItems: mapToCheckboxItems(filters.storage),
    ramItems: mapToCheckboxItems(filters.specifications.ram),
    osItems: mapToCheckboxItems(filters.specifications.os),
    processorItems: mapToCheckboxItems(filters.specifications.processor),
    displaySizeItems: mapToCheckboxItems(filters.specifications.displaySize),
    displayTypeItems: mapToCheckboxItems(filters.specifications.displayType),
  };
};
