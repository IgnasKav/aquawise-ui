import { cn } from '@/lib/utils';
import {
    StatusCol,
    StatusColProps,
    StringCol,
    StringColProps,
} from '../table-col/table-col';
import { ActionsCol, ActionsColProps } from '../table-col/actions-col';

export type EntityTableColTypes = 'string' | 'status' | 'actions';

export type EntityTableColProps = Text | Status | Actions;

type Text = {
    type: 'string';
} & StringColProps;

type Status = {
    type: 'status';
} & StatusColProps;

type Actions = {
    type: 'actions';
} & ActionsColProps;

type EntityTableRowProps = {
    className?: string;
    cols: EntityTableColProps[];
};

const EntityTableRow = ({ cols, className }: EntityTableRowProps) => {
    return (
        <div className={cn('flex h-14 items-center gap-4 px-4', className)}>
            {cols.map((col, i) => getEntityTableCol(i, col))}
        </div>
    );
};

const getEntityTableCol = (index: number, props: EntityTableColProps) => {
    switch (props.type) {
        case 'string':
            return (
                <StringCol
                    key={index}
                    className={props.className}
                    value={props.value}
                />
            );
        case 'status':
            return (
                <StatusCol
                    key={index}
                    className={props.className}
                    value={props.value}
                />
            );
        case 'actions':
            return <ActionsCol key={index} actions={props.actions} />;
    }
};

export { EntityTableRow };
