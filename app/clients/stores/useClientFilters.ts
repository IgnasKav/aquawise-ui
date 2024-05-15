import { CategoryFilter } from 'app/shared/components/entity-table/filter/status-filter';
import { produce } from 'immer';
import { create } from 'zustand';
import { ClientType } from '../models/Client';

type UseClientFiltersState = {
    typeFilter: CategoryFilter<ClientType>[];
    setTypeFilter: (filters: CategoryFilter<ClientType>[]) => void;
};

const useClientFilters = create<UseClientFiltersState>((set) => ({
    typeFilter: [
        { label: 'Person', value: 'person', isSelected: false },
        { label: 'Company', value: 'company', isSelected: false },
    ],
    setTypeFilter: (filters: CategoryFilter<ClientType>[]) =>
        set(
            produce((state: UseClientFiltersState) => {
                state.typeFilter = filters;
            }),
        ),
}));

export { useClientFilters };
