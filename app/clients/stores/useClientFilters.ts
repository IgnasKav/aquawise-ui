import { CategoryFilter } from 'app/shared/components/entity-table/filter/category-filter';
import { produce } from 'immer';
import { create } from 'zustand';
import { ClientType } from '../models/Client';

type UseClientFiltersState = {
    searchText: string;
    setSearchText: (value: string) => void;
    typeFilters: CategoryFilter<ClientType>[];
    setTypeFilters: (filters: CategoryFilter<ClientType>[]) => void;
};

const useClientFilters = create<UseClientFiltersState>((set) => ({
    searchText: '',
    setSearchText: (value: string) => set(() => ({ searchText: value })),
    typeFilters: [
        { label: 'Person', value: 'person', isSelected: false },
        { label: 'Company', value: 'company', isSelected: false },
    ],
    setTypeFilters: (filters: CategoryFilter<ClientType>[]) =>
        set(
            produce((state: UseClientFiltersState) => {
                state.typeFilters = filters;
            }),
        ),
}));

export { useClientFilters };
