'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import classNames from 'classnames';

interface NavButtonProps {
    to: string;
    title: string;
    icon?: React.ReactNode;
}

const NavButton = ({ to, title, icon = null }: NavButtonProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const navigate = () => {
        router.push(to);
    };

    const isActive = pathName === '/' ? to === pathName : to.includes(pathName);

    return (
        <Button
            variant="ghost"
            onClick={() => navigate()}
            className={classNames({
                'bg-accent text-accent-foreground': isActive,
            })}
        >
            <div className="mr-2 h-4 w-4 flex items-center">{icon}</div>
            {title}
        </Button>
    );
};

export default NavButton;
