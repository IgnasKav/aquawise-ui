import { CategoryFilter } from 'app/shared/components/entity-table/filter/category-filter';
import { produce } from 'immer';
import { create } from 'zustand';
import { ClientType } from '../models/Client';

export type ClientSearchField = 'email' | 'name' | 'phone' | 'address';

type UseClientFiltersState = {
    searchText: string;
    setSearchText: (value: string) => void;
    typeFilters: CategoryFilter<ClientType>[];
    setTypeFilters: (filters: CategoryFilter<ClientType>[]) => void;
    searchFields: CategoryFilter<ClientSearchField>[];
    setSearchFields: (fields: CategoryFilter<ClientSearchField>[]) => void;
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
    searchFields: [
        { label: 'Email', value: 'email', isSelected: false },
        { label: 'Name', value: 'name', isSelected: false },
        { label: 'Phone', value: 'phone', isSelected: false },
        { label: 'Address', value: 'address', isSelected: false },
    ],
    setSearchFields: (fields: CategoryFilter<ClientSearchField>[]) =>
        set(
            produce((state: UseClientFiltersState) => {
                state.searchFields = fields;
            }),
        ),
}));

export { useClientFilters };
