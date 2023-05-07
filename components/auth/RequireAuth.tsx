import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../../stores/useAuth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [user] = useAuth((state) => [state.user]);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    return <>{children}</>;
};
