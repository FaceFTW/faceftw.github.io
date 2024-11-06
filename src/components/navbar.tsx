'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { CircleUser, Home, Menu, MoonStar, Rss, ScrollText, SquareDashedBottomCode, Sun, X } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu';
import { useTheme } from 'next-themes';

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
    },
    {
        title: 'Projects',
        url: '/projects',
        icon: SquareDashedBottomCode,
    },
    {
        title: 'Resume',
        url: '/resume',
        icon: ScrollText,
    },
    {
        title: 'Blog',
        url: '/blog',
        icon: Rss,
    },
    {
        title: 'About',
        url: '/about',
        icon: CircleUser,
    },
];

interface MobileNavProps {
    children?: React.ReactNode;
    closeFn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNav({ children, closeFn }: MobileNavProps) {
    useLockBody();

    return (
        <div
            className={cn(
                'slide-in-from-bottom-80 fixed inset-0 top-10 z-50 grid h-[calc(100vh-4rem)] animate-in grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
            )}>
            <div className='relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-lg'>
                <nav className='grid grid-flow-row auto-rows-max text-sm'>
                    {items.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => closeFn(false)}
                            className='flex w-full items-center gap-2 rounded-md p-2 font-medium text-sm hover:underline'>
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>
                {children}
            </div>
        </div>
    );
}

export function MainNav({ children }: { children?: React.ReactNode }) {
    // const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className='flex gap-16 md:gap-10'>
            <Link href='/' className='hidden items-center space-x-2 md:flex'>
                <span className='hidden font-bold sm:inline-block'>Alex Westerman</span>
            </Link>
            <NavigationMenu className='hidden md:flex'>
                <NavigationMenuList className='gap-6 md:gap-10'>
                    {items?.map((item) => (
                        <NavigationMenuItem key={item.title} className=''>
                            <Link
                                key={item.title}
                                href={item.url}
                                className={cn(
                                    'flex font-medium text-lg transition-colors hover:text-foreground/80 sm:text-sm'
                                )}>
                                <span>{item.title}</span>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <Button
                variant='ghost'
                className='ml-4 flex items-center space-x-2 md:hidden'
                onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <X /> : <Menu />}
                <span className='font-bold'>Alex Westerman</span>
            </Button>
            {showMobileMenu && <MobileNav closeFn={setShowMobileMenu}>{children}</MobileNav>}
            <span className='flex-grow' />
            <div className='flex pr-2'>
                {mounted && (
                    <Button
                        variant='link'
                        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
                        aria-label='Change Light/Dark Mode'>
                        {resolvedTheme === 'dark' && <MoonStar />}
                        {resolvedTheme === 'light' && <Sun />}
                    </Button>
                )}
            </div>
        </div>
    );
}
