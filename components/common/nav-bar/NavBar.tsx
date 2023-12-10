import {
    Button,
    Card,
    Group,
    MantineSize,
} from '@mantine/core';
import { AiOutlineHome, AiOutlineMobile, AiOutlineTeam } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useAuth from '../../../stores/useAuth';
import css from './nav-bar.module.scss';
import NavBarLoader from './NavBarLoader';
import { useState } from 'react';
import AuthModal from '../../auth/auth-modal/AuthModal';
import { HiOutlineColorSwatch, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { UserRole } from '../../../models/User';
import ProfileButton from './ProfileButton';
import classNames from 'classnames';
import { BsBoxSeam } from 'react-icons/bs';

interface NavButtonProps {
    to?: string;
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    size?: MantineSize;
}

const NavButton = ({
    to,
    title,
    icon = '',
    size = 'lg',
    onClick,
}: NavButtonProps) => {
    const router = useRouter();

    return (
        <Button
            variant={router.pathname == to ? 'light' : 'subtle'}
            size={size}
            leftSection={icon}
            onClick={to ? () => router.push(to) : onClick}
        >
            {title}
        </Button>
    );
};

const NavBar = () => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const [authModalOpened, setAuthModalOpened] = useState<boolean>(false);
    // const [opened, setOpened] = useState(false);

    return (
        <div className={css.navContainer}>
            <Card
                className={classNames(css.navCard, { [css.hidden]: isLoading })}
                shadow="md"
                radius="lg"
                p="md"
                withBorder
            >
                <Group justify="space-between">
                    <Group>
                        {!user && (
                            <NavButton
                                to="/"
                                title="Home"
                                icon={<AiOutlineHome />}
                            />
                        )}
                        {user && user.role == UserRole.Support && (
                            <NavButton
                                to="/companies"
                                title="Companies"
                                icon={<HiOutlineOfficeBuilding />}
                            />
                        )}
                        {user && user.role == UserRole.Admin && (
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
                        {user && user.role == UserRole.User && (
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
                    </Group>
                    <Group>
                        {user ? (
                            <ProfileButton user={user} />
                        ) : (
                            <NavButton
                                title="Log in"
                                onClick={() => setAuthModalOpened(true)}
                            />
                        )}
                    </Group>
                    <AuthModal
                        isOpened={authModalOpened}
                        onClose={() => setAuthModalOpened(false)}
                    />
                </Group>
            </Card>
            <NavBarLoader
                className={classNames({ [css.hidden]: !isLoading })}
            />
        </div>
    );
};

export default NavBar;
