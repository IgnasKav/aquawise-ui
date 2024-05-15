'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { PlusCircledIcon, CheckIcon } from '@radix-ui/react-icons';

export type CategoryFilter<T> = {
    label: string;
    value: T;
    isSelected: boolean;
};

type CategoryFilterProps<T> = {
    title?: string;
    filters: CategoryFilter<T>[];
    setFilters: (filters: CategoryFilter<T>[]) => void;
};

const CategoryFilter = <T,>({
    title,
    filters,
    setFilters,
}: CategoryFilterProps<T>) => {
    const selectedFilters = filters.filter((f) => f.isSelected);

    const onSelect = (filter: CategoryFilter<T>) => {
        const updatedFilters = filters.map((f) =>
            f.value === filter.value ? { ...f, isSelected: !f.isSelected } : f,
        );

        setFilters(updatedFilters);
    };

    const clearFilters = () => {
        const updatedFilters = filters.map((f) => ({
            ...f,
            isSelected: false,
        }));

        setFilters(updatedFilters);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                >
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedFilters?.length > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedFilters.length}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedFilters.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedFilters.length} selected
                                    </Badge>
                                ) : (
                                    selectedFilters.map((filter, i) => (
                                        <Badge
                                            variant="secondary"
                                            key={i}
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {filter.label}
                                        </Badge>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {filters.map((filter, i) => {
                                const { isSelected, label } = filter;
                                return (
                                    <CommandItem
                                        key={i}
                                        onSelect={() => onSelect(filter)}
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected &&
                                                    'bg-primary text-primary-foreground',
                                            )}
                                        >
                                            {isSelected && (
                                                <CheckIcon className="h-4 w-4" />
                                            )}
                                        </div>
                                        <span>{label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedFilters.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        className="justify-center text-center"
                                        onSelect={clearFilters}
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export { CategoryFilter };
