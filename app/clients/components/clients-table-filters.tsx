'use client';

import { Button } from '@/components/ui/button';
import {
    StatusFilterOption,
    StatusFilter,
} from 'app/shared/components/entity-table/filter/status-filter';
import { useEffect } from 'react';
import { useFilters } from 'stores/useFilters';

const options: StatusFilterOption[] = [
    { label: 'Client', value: 'client', isSelected: false },
    { label: 'Company', value: 'company', isSelected: false },
];

const ClientsTableFitlers = () => {
    const [filters, setFilters] = useFilters((state) => [
        state.filters,
        state.setFilters,
    ]);

    useEffect(() => {
        setFilters(options);
    }, [setFilters]);

    const handleSearch = () => {
        console.log('searching', filters);
    };

    return (
        <div className="flex gap-x-2">
            <StatusFilter title="Status" options={options} />
            <Button className="h-8" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export { ClientsTableFitlers };
