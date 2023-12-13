import { Card, Group } from '@mantine/core';
import { AiOutlineHome, AiOutlineMobile, AiOutlineTeam } from 'react-icons/ai';
import css from './nav-bar.module.scss';
import { HiOutlineColorSwatch, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { User, UserRole } from '../../../models/User';
import { BsBoxSeam } from 'react-icons/bs';
import NavButton from './NavButton';
import AuthModal from '../../auth/auth-modal/AuthModal';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../../app/api/auth/[...nextauth]/route';
import ProfileButton from './ProfileButton';

const NavBar = async () => {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user as User | undefined;

    return (
        <div className={css.navContainer}>
            {/* classNames(css.navCard, { [css.hidden]: isLoading }) */}
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
                    {user ? <ProfileButton user={user} /> : <AuthModal />}
                </Group>
            </Card>
            {/* <NavBarLoader
                className={classNames({ [css.hidden]: !isLoading })}
            /> */}
        </div>
    );
};

export default NavBar;
