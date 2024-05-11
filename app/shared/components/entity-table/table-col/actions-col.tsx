'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';

export type EntityTableItemAction = {
    name: string;
    fn: () => void;
};

type ActionsColProps = {
    actions: EntityTableItemAction[];
};

const ActionsCol = ({ actions }: ActionsColProps) => {
    return (
        <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {actions.map((action) => (
                        <DropdownMenuItem
                            key={action.name}
                            onClick={() => action.fn()}
                        >
                            {action.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    );
};

export { ActionsCol };
