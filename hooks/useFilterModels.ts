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
  filterModelItems: FilterCheckboxProps[];
  loadingModels: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterModels = (): ReturnProps => {
  const [models, setModels] = useState<ModelItem[]>([]);
  const [loadingModels, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    Api.models
      .getModels()
      .then(setModels)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filterModelItems = models.map((model) => ({
    text: model.name,
    value: String(model.id),
  }));

  return { models, filterModelItems, loadingModels, onAddId: toggle, selectedIds };
};
