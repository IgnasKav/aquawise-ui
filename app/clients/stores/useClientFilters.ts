import { StatusFilterOption } from 'app/shared/components/entity-table/filter/status-filter';
import { produce } from 'immer';
import { create } from 'zustand';
import { ClientType } from '../models/Client';

type UseClientFiltersState = {
    statusFilters: StatusFilterOption<ClientType>[];
    setStatusFilters: (filters: StatusFilterOption<ClientType>[]) => void;
};

const useClientFilters = create<UseClientFiltersState>((set) => ({
    statusFilters: [
        { label: 'Person', value: 'person', isSelected: false },
        { label: 'Company', value: 'company', isSelected: false },
    ],
    setStatusFilters: (filters: StatusFilterOption<ClientType>[]) =>
        set(
            produce((state: UseClientFiltersState) => {
                state.statusFilters = filters;
            }),
        ),
}));

export { useClientFilters };
