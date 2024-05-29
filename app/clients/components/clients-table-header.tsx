import { StringCol } from 'app/shared/components/entity-table/table-col/table-col';

const ClientsTableHeader = () => {
    return (
        <div className="text-muted-foreground text-medium bg-primary-foreground flex h-14 items-center gap-4 px-4">
            <StringCol className="flex-none w-5" value="#" />
            <StringCol className="flex-auto w-64" value="Email" />
            <StringCol className="flex-auto w-60" value="Name" />
            <StringCol
                className="hidden xl:block flex-none w-24"
                value="Type"
            />
            <StringCol
                className="hidden md:block flex-auto w-60"
                value="Phone"
            />
            <StringCol
                className="hidden xl:block flex-auto w-60"
                value="Address"
            />
            <StringCol className="w-[40px]" value="" />
        </div>
    );
};

export { ClientsTableHeader };
