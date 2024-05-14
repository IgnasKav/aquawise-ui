'use client';

import { Button } from '@/components/ui/button';
import {
    StatusFilterOption,
    StatusFilter,
} from 'app/shared/components/entity-table/filter/status-filter';
import { useEffect } from 'react';
import { useClientFilters } from '../stores/useClientFilters';

const options: StatusFilterOption[] = [
    { label: 'Client', value: 'client', isSelected: false },
    { label: 'Company', value: 'company', isSelected: false },
];

const ClientsTableFitlers = () => {
    const [statusFilters, setStatusFilters] = useClientFilters((state) => [
        state.statusFilters,
        state.setStatusFilters,
    ]);

    useEffect(() => {
        setStatusFilters(options);
    }, [setStatusFilters]);

    const handleSearch = () => {
        const selectedStatusFilters = statusFilters.filter((f) => f.isSelected);
        console.log('searching', selectedStatusFilters);
    };

    return (
        <div className="flex gap-x-2">
            <StatusFilter
                title="Status"
                filters={statusFilters}
                setFilters={setStatusFilters}
            />
            <Button className="h-8" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export { ClientsTableFitlers };
