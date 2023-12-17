'use client';

import { Card, Group } from '@mantine/core';
import { AiOutlineHome, AiOutlineMobile, AiOutlineTeam } from 'react-icons/ai';
import css from './nav-bar.module.scss';
import { HiOutlineColorSwatch, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { User, UserRole } from '../../../models/User';
import { BsBoxSeam } from 'react-icons/bs';
import NavButton from './NavButton';
import AuthModal from '../../auth/auth-modal/AuthModal';
import ProfileButton from './ProfileButton';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface NavbarProps {
    session: Session | null;
}

const NavBar = ({ session: initialSession }: NavbarProps) => {
    const { data: clientSession } = useSession();
    const session = clientSession ?? initialSession;
    console.log('sessiong', session);
    const user = session?.user as User | undefined;

    return (
        <div className={css.navContainer}>
            <Card shadow="md" radius="lg" p="md" withBorder>
                <Group justify="space-between">
                    <Group>
                        {!user && (
                            <NavButton
                                to="/"
                                title="Home"
                                icon={<AiOutlineHome />}
                            />
                        )}
                        {user && (
                            <>
                                {user.role == UserRole.Admin && (
                                    <NavButton
                                        to="/companies"
                                        title="Companies"
                                        icon={<HiOutlineOfficeBuilding />}
                                    />
                                )}
                                {user.role == UserRole.Admin && (
                                    <>
                                        <NavButton
                                            to="/clients"
                                            title="Clients"
                                            icon={<AiOutlineMobile />}
                                        />
                                        <NavButton
                                            to="/products"
                                            title="Products"
                                            icon={<BsBoxSeam />}
                                        />
                                        <NavButton
                                            to="/orders"
                                            title="Orders"
                                            icon={<HiOutlineColorSwatch />}
                                        />
                                        <NavButton
                                            to="/users"
                                            title="Team"
                                            icon={<AiOutlineTeam />}
                                        />
                                    </>
                                )}
                                {user.role == UserRole.User && (
                                    <>
                                        <NavButton
                                            to="/clients"
                                            title="Clients"
                                            icon={<AiOutlineMobile />}
                                        />
                                        <NavButton
                                            to="/products"
                                            title="Products"
                                            icon={<BsBoxSeam />}
                                        />
                                        <NavButton
                                            to="/orders"
                                            title="Orders"
                                            icon={<HiOutlineColorSwatch />}
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
