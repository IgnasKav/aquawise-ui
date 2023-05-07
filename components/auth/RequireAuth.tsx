import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../../stores/useAuth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const router = useRouter();

    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (!user) {
        return null;
    }

    return <>{children}</>;
};
