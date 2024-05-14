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
import { useFilters } from 'stores/useFilters';

export type StatusFilterOption = {
    label: string;
    value: string;
    isSelected: boolean;
};

type StatusFilterProps = {
    title?: string;
    options: StatusFilterOption[];
};

const StatusFilter = ({ title }: StatusFilterProps) => {
    const [options, setOptions] = useFilters((state) => [
        state.filters,
        state.setFilters,
    ]);

    const selectedOptions = options.filter((o) => o.isSelected);

    const onSelect = (option: StatusFilterOption) => {
        const updatedOptions = options.map((o) =>
            o.value === option.value ? { ...o, isSelected: !o.isSelected } : o,
        );

        setOptions(updatedOptions);
    };

    const clearFilters = () => {
        const updatedOptions = options.map((o) => ({
            ...o,
            isSelected: false,
        }));

        setOptions(updatedOptions);
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
                    {selectedOptions?.length > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedOptions.length}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedOptions.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedOptions.length} selected
                                    </Badge>
                                ) : (
                                    selectedOptions.map((option) => (
                                        <Badge
                                            variant="secondary"
                                            key={option.value}
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {option.label}
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
                            {options.map((option) => {
                                const { isSelected, value, label } = option;
                                return (
                                    <CommandItem
                                        key={value}
                                        onSelect={() => onSelect(option)}
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
                        {selectedOptions.length > 0 && (
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

export { StatusFilter };
