'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

// import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
// import { Icons } from '@/components/icons';

import { useLockBody } from '@/hooks/use-lock-body';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu';

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Projects',
        url: '/projects',
    },
    {
        title: 'Resume',
        url: '/resume',
    },
    {
        title: 'Blog',
        url: '/blog',
    },
    {
        title: 'About',
        url: '/about',
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
                <Link href='/' className='flex items-center space-x-2'>
                    <Menu />
                    <span className='font-bold'>Alex Westerman</span>
                </Link>
                <nav className='grid grid-flow-row auto-rows-max text-sm'>
                    {items.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            className='flex w-full items-center rounded-md p-2 font-medium text-sm hover:underline'>
                            {item.title}
                        </Link>
                    ))}
                </nav>
                {children}
            </div>
        </div>
    );
}

interface MainNavProps {
    items?: { title: string; url: string }[];
    children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
    const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

    return (
        <div className='flex gap-6 md:gap-10'>
            <Link href='/' className='hidden items-center space-x-2 md:flex'>
                {/* <Icons.logo /> */}
                <span className='hidden font-bold sm:inline-block'>Alex Westerman</span>
            </Link>
            <NavigationMenu>
                <NavigationMenuList>
                    {items?.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <Link
                                key={item.title}
                                href={item.url}
                                className={cn(
                                    'flex items-center font-medium text-lg transition-colors hover:text-foreground/80 sm:text-sm'
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
                <span className='font-bold'>Menu</span>
            </Button>
            {showMobileMenu && <MobileNav>{children}</MobileNav>}
        </div>
    );
}
