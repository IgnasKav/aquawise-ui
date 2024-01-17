import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthGuard({
    children,
}: {
    children: JSX.Element;
}) {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user) {
        redirect('/');
    }

    return children;
}
