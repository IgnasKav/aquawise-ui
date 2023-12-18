'use client';

import { Card, Group } from '@mantine/core';
import css from './nav-bar.module.scss';
import NavButton from './NavButton';
import ProfileButton from './ProfileButton';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { User, UserRole } from 'models/User';
import AuthModal from 'components/auth/auth-modal/AuthModal';
import {
    Building2,
    Home,
    Smartphone,
    Package,
    Users,
    ScrollText,
} from 'lucide-react';

interface NavbarProps {
    session: Session | null;
}

const NavBar = ({ session: initialSession }: NavbarProps) => {
    const { data: clientSession } = useSession();
    const session = clientSession ?? initialSession;
    const user = session?.user as User | undefined;

    return (
        <div className={css.navContainer}>
            <Card shadow="md" radius="lg" p="md" withBorder>
                <Group justify="space-between">
                    <Group>
                        <NavButton to="/" title="Home" icon={<Home />} />
                        {user && (
                            <>
                                {user.role == UserRole.Admin && (
                                    <NavButton
                                        to="/companies"
                                        title="Companies"
                                        icon={<Building2 />}
                                    />
                                )}
                                {user.role == UserRole.Admin && (
                                    <>
                                        <NavButton
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
                                        <NavButton
                                            to="/users"
                                            title="Team"
                                            icon={<Users />}
                                        />
                                    </>
                                )}
                                {user.role == UserRole.User && (
                                    <>
                                        <NavButton
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
                    </Group>
                    {user ? <ProfileButton user={user} /> : <AuthModal />}
                </Group>
            </Card>
        </div>
    );
};

export default NavBar;
