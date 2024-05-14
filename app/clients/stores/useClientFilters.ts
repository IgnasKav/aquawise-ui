import { StatusFilterOption } from 'app/shared/components/entity-table/filter/status-filter';
import { produce } from 'immer';
import { create } from 'zustand';

type UseClientFiltersState = {
    statusFilters: StatusFilterOption[];
    setStatusFilters: (filters: StatusFilterOption[]) => void;
};

const useClientFilters = create<UseClientFiltersState>((set) => ({
    statusFilters: [
        { label: 'Client', value: 'client', isSelected: false },
        { label: 'Company', value: 'company', isSelected: false },
    ],
    setStatusFilters: (filters: StatusFilterOption[]) =>
        set(
            produce((state: UseClientFiltersState) => {
                state.statusFilters = filters;
            }),
        ),
}));

export { useClientFilters };
