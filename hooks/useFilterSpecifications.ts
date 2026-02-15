import type { FiltersDTO, UIFilters } from "@/app/types";
import { mapFiltersToUI } from "@/components/features/filters/filters-mapper";
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";

interface ReturnProps extends UIFilters {
  filters: FiltersDTO | null;
  loading: boolean;
}

export const useFilterSpecifications = (): ReturnProps => {
  const [filters, setFilters] = useState<FiltersDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.filters
      .getFilters()
      .then(setFilters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const ui = mapFiltersToUI(filters);

  return {
    filters,
    loading,
    ...ui,
  };
};
