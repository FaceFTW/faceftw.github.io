'use client';

import type React from 'react';
import { CircleUser, Home, Menu, MoonStar, Rss, ScrollText, SquareDashedBottomCode, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import ReactDOM from 'react-dom/client';
// import { Route, Switch, Link, useLocation, Router, useRoute } from 'wouter';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
const SidenavLinks = ({
    showText = false,
    closeSidebarTrigger = () => {
        return;
    },
}: {
    showText?: boolean;
    closeSidebarTrigger?: () => void;
}) => {
    const sidebarNavItemClass =
        'flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground';
    const sidenavTextClass = showText ? 'visible' : 'sr-only';

    const wrapWithToolTip = (elements: React.ReactNode, text: string) => {
        return showText ? (
            elements
        ) : (
            <TooltipProvider>
                <Tooltip delayDuration={500}>
                    <TooltipTrigger asChild>{elements}</TooltipTrigger>
                    <TooltipContent>
                        <p>{text}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };

    return (
        <nav className='left-0 grid gap-2 md:font-medium md:text-lg xl:text-xl'>
            {wrapWithToolTip(
                <Link href='/' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <Home className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Home</span>
                </Link>,
                'Home'
            )}
            {wrapWithToolTip(
                <Link href='/projects' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <SquareDashedBottomCode className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Projects</span>
                </Link>,
                'Projects'
            )}
            {wrapWithToolTip(
                <Link href='/resume' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <ScrollText className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Resume</span>
                </Link>,
                'Resume'
            )}
            {wrapWithToolTip(
                <Link href='/blog' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <Rss className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Blog (Under Construction)</span>
                </Link>,
                'Blog (Under Construction)'
            )}
            {wrapWithToolTip(
                <Link href='/about' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <CircleUser className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>About</span>
                </Link>,
                'About'
            )}
        </nav>
    );
};

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

const SiteFooter = () => {
    return (
        <footer className='mx-auto mb-4 block w-[80%]'>
            <Card className='flex'>
                <CardContent className='mx-auto mt-4 flex text-wrap'>
                    <pre className='text-wrap text-center'>
                        Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights
                        Reserved. {'\n'}
                        Source code for this website is licensed under the MIT License {'\n'}
                        All projects mentioned are subject to their specific licenses and copyrights as designated by
                        their owners
                        {'\n\n'}
                        <Link href='/funny' className='text-gray-500 text-sm decoration-muted'>
                            super secret link
                        </Link>
                    </pre>
                </CardContent>
            </Card>
        </footer>
    );
};

const LayoutInternal = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();

    return (
        <div className='flex'>
            <Sidebar collapsible='icon'>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon className='h-5 w-5 xl:h-10 xl:w-10' />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <main className='flex flex-1 flex-col w-max'>
                <header className='flex h-[44px] items-center gap-2 border-b bg-muted/40 lg:gap-4 xl:h-[60px]'>
                    <SidebarTrigger />
                    <div className='w-full flex-1'>
                        <span className='text-sm lg:text-xl xl:text-2xl'>Alex Westerman</span>
                    </div>
                    {/* <div className='flex pr-2'>
                                <Button
                                    variant='ghost'
                                    onClick={() => setDarkMode(!darkMode)}
                                    aria-label='Change Light/Dark Mode'>
                                    {darkMode && <MoonStar />}
                                    {!darkMode && <Sun />}
                                </Button>
                            </div> */}
                </header>
                {children}
                <div className='flex items-center'>
                    <SiteFooter />
                </div>
            </main>
        </div>
    );
};

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <LayoutInternal>{children}</LayoutInternal>;
}
