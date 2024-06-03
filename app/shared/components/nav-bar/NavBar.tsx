'use client';
import NavButton from './NavButton';
import ProfileButton from './ProfileButton';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { User } from 'app/auth/models/User';
import AuthModal from 'app/auth/components/auth-modal/AuthModal';
import {
    Building2,
    Home,
    Smartphone,
    Package,
    Users,
    ScrollText,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { api } from 'api/api';
import { buildClientsUrl } from 'app/clients/utils/client-url-builder';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    session: Session | null;
}

type NavigationArea = 'home' | 'clients' | 'products' | 'orders';

const NavBar = ({ session: initialSession }: NavbarProps) => {
    const { data: clientSession } = useSession();
    const session = clientSession ?? initialSession;
    const user = session?.user as User | undefined;
    const router = useRouter();

    const navigate = async (area: NavigationArea) => {
        if (!user) return;

        switch (area) {
            case 'clients':
                const resp = await api.Users.getUserFilter(user?.id, 'clients');

                console.log(resp);

                if (resp.isError) return;

                const data = resp.data ?? {
                    page: 1,
                    searchText: '',
                    searchFields: [],
                    types: [],
                };

                const url = buildClientsUrl(data);

                router.push(url);
                break;
        }
    };

    return (
        <div className="mt-4 mb-4">
            <Card className="p-2 flex justify-between">
                <div className="flex gap-2">
                    <NavButton to="/" title="Home" icon={<Home />} />
                    {user && (
                        <>
                            {user.role === 'support' && (
                                <>
                                    <NavButton
                                        to="/companies"
                                        title="Companies"
                                        icon={<Building2 />}
                                    />
                                </>
                            )}
                            {(user.role === 'user' ||
                                user.role === 'admin') && (
                                <>
                                    <NavButton
                                        onClick={() => navigate('clients')}
                                        to="/clients"
                                        title="Clients"
                                        icon={<Smartphone />}
                                    />
                                    <NavButton
                                        to="/products"
                                        title="Products"
                                        icon={<Package />}
                                    />
                                    <NavButton
                                        to="/orders"
                                        title="Orders"
                                        icon={<ScrollText />}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
                {user ? <ProfileButton user={user} /> : <AuthModal />}
            </Card>
        </div>
    );
};

export default NavBar;
