import {Skeleton} from "@mantine/core";
import css from './nav-bar.module.scss';

interface Props {
    className?: string;
}

const NavBarLoader = ({className}: Props) => {
    return(<Skeleton className={`${css.navLoader} ${className}`} radius="lg"/>)
}

export default NavBarLoader;
