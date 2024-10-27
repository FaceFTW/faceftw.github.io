'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { CircleUser, Home, Menu, Rss, ScrollText, SquareDashedBottomCode, X } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu';

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
}

export function MobileNav({ children }: MobileNavProps) {
    useLockBody();

    return (
        <div
            className={cn(
                'slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] animate-in grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
            )}>
            <div className='relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md'>
                {/* <Link href='/' className='flex items-center space-x-2'>
                    <Menu />
                    <span className='font-bold'>Alex Westerman</span>
                </Link> */}
                <nav className='grid grid-flow-row auto-rows-max text-sm'>
                    {items.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
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

interface MainNavProps {
    children?: React.ReactNode;
}

export function MainNav({ children }: MainNavProps) {
    // const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

    return (
        <div className='flex gap-6 md:gap-10'>
            <Link href='/' className='hidden items-center space-x-2 md:flex'>
                <span className='hidden font-bold sm:inline-block'>Alex Westerman</span>
            </Link>
            <NavigationMenu className='hidden md:flex'>
                <NavigationMenuList className='gap-6 md:gap-10'>
                    {items?.map((item) => (
                        <NavigationMenuItem
                            key={item.title}
                            className='
                        '>
                            <Link
                                key={item.title}
                                href={item.url}
                                className={cn(
                                    'flex font-medium text-lg transition-colors hover:text-foreground/80 sm:text-sm'
                                    // item.url.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60'
                                )}>
                                <span>{item.title}</span>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <Button
                variant='ghost'
                className='flex items-center space-x-2 md:hidden'
                onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <X /> : <Menu />}
                <span className='font-bold'>Alex Westerman</span>
            </Button>
            {showMobileMenu && <MobileNav>{children}</MobileNav>}
        </div>
    );
}
