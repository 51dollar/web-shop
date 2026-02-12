import type { FilterCheckboxProps } from "@/app/types";
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

type ModelItem = {
  id: number;
  name: string;
};

interface ReturnProps {
  models: ModelItem[];
  filterItems: FilterCheckboxProps[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterModels = (): ReturnProps => {
  const [models, setModels] = useState<ModelItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    Api.models
      .getModels()
      .then(setModels)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filterItems = models.map((model) => ({
    text: model.name,
    value: String(model.id),
  }));

  return { models, filterItems, loading, onAddId: toggle, selectedIds };
};
