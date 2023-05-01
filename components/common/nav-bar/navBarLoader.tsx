import {Skeleton} from "@mantine/core";
import css from './navBar.module.scss';

const NavBarLoader = () => {
    return(<Skeleton className={css.navLoader} radius="lg"/>)
}

export default NavBarLoader;
