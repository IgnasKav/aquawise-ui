import { StatusFilterOption } from 'app/shared/components/entity-table/filter/status-filter';
import { produce } from 'immer';
import { create } from 'zustand';

type UseFiltersState = {
    filters: StatusFilterOption[];
    setFilters: (filters: StatusFilterOption[]) => void;
};

const useFilters = create<UseFiltersState>((set) => ({
    filters: [],
    setFilters: (filters: StatusFilterOption[]) =>
        set(
            produce((state: UseFiltersState) => {
                state.filters = filters;
            }),
        ),
}));

export { useFilters };
