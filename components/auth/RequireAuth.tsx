import { useRouter } from 'next/router';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    // const router = useRouter();

    return <>{children}</>;
};
