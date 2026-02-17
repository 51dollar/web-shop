import { Api } from "@/services/api-client";
import { Filters } from ".";

export default async function FiltersWrapper() {
    const filtersData = await Api.filters.getFilters();
    return <Filters initialData={filtersData} />;
}
