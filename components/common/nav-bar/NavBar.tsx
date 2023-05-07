import { Button, Card, Group, MantineSize } from '@mantine/core';
import { AiOutlineHome } from 'react-icons/ai';
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

interface NavButtonProps {
    to?: string;
    color: string;
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    size?: MantineSize;
}

const NavButton = ({
    to,
    color,
    title,
    icon = '',
    size = 'lg',
    onClick,
}: NavButtonProps) => {
    const router = useRouter();

    return (
        <Button
            variant={router.pathname == to ? 'light' : 'subtle'}
            color={color}
            size={size}
            leftIcon={icon}
            onClick={to ? () => router.push(to) : onClick}
        >
            {title}
        </Button>
    );
};

const NavBar = () => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const [authModalOpened, setAuthModalOpened] = useState<boolean>(false);

    return (
        <div className={css.navContainer}>
            <Card
                className={classNames(css.navCard, { [css.hidden]: isLoading })}
                shadow="md"
                radius="lg"
                p="md"
                withBorder
            >
                <Group position="apart">
                    <NavButton
                        to="/"
                        color="blue"
                        title="Home"
                        icon={<AiOutlineHome />}
                    />
                    {user && user.role == UserRole.Support && (
                        <NavButton
                            to="/companies"
                            color="blue"
                            title="Companies"
                            icon={<HiOutlineOfficeBuilding />}
                        />
                    )}
                    <NavButton
                        to="/products"
                        color="blue"
                        title="Products"
                        icon={<HiOutlineColorSwatch />}
                    />
                    <Group>
                        {user ? (
                            <ProfileButton user={user} />
                        ) : (
                            <NavButton
                                color="blue"
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
