'use client';

import { MantineSize, Button } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

interface NavButtonProps {
    to?: string;
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    size?: MantineSize;
}

export default function NavButton({
    to,
    title,
    icon = '',
    size = 'lg',
    onClick,
}: NavButtonProps) {
    const pathName = usePathname();
    const router = useRouter();

    return (
        <Button
            variant={pathName == to ? 'light' : 'subtle'}
            size={size}
            leftSection={icon}
            onClick={to ? () => router.push(to) : onClick}
        >
            {title}
        </Button>
    );
}
