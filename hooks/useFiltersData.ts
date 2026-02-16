import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import type { FiltersDTO } from "@/app/types";
import {
  mapFiltersToUI,
  type UIFilters,
} from "@/components/features/filters/filters-mapper";

interface ReturnProps extends UIFilters {
  filters: FiltersDTO | null;
  loading: boolean;
}

export const useFiltersData = (): ReturnProps => {
  const [filters, setFilters] = useState<FiltersDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.filters
      .getFilters()
      .then(setFilters)
      .finally(() => setLoading(false));
  }, []);

  return {
    filters,
    loading,
    ...mapFiltersToUI(filters),
  };
};
