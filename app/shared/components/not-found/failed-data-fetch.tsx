type FailedDataFetchComponent = {
    title: string;
    reason: string;
};

const FailedDataFetchComponent = ({
    title,
    reason,
}: FailedDataFetchComponent) => {
    return (
        <div className="flex flex-col items-center">
            <div>
                <div className="text-2xl font-semibold">{title}</div>
                <div className="mt-2 font-semibold text-muted-foreground">
                    Reason:
                </div>
                <blockquote className="mt-1 border-l-2 pl-6 italic">
                    {reason}
                </blockquote>
            </div>
        </div>
    );
};

export { FailedDataFetchComponent };
