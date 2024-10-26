'use client';
import type React from 'react';
import { CircleUser, Home, Menu, MoonStar, Rss, ScrollText, SquareDashedBottomCode, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import ReactDOM from 'react-dom/client';
// import { Route, Switch, Link, useLocation, Router, useRoute } from 'wouter';
import Link from 'next/link';
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarGroup,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarProvider,
//     SidebarTrigger,
//     useSidebar,
// } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { MainNav } from '@/components/navbar';


const LayoutInternal = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    // const { state, open, setOpen, openMobile, setOpenMobile, toggleSidebar } = useSidebar();
    // const isMobile = useIsMobile();

    // const wrapWithToolTip = (elements: React.ReactNode, text: string) => {
    //     return open ? (
    //         elements
    //     ) : (
    //         <TooltipProvider key={text}>
    //             <Tooltip delayDuration={500}>
    //                 <TooltipTrigger asChild>{elements}</TooltipTrigger>
    //                 <TooltipContent>
    //                     <p>{text}</p>
    //                 </TooltipContent>
    //             </Tooltip>
    //         </TooltipProvider>
    //     );
    // };

    return (
        <div className='flex flex-grow'>
            <main className='flex flex-1 flex-grow flex-col'>
                <header className='flex h-[44px] items-center gap-2 border-b bg-muted/40 lg:gap-4 xl:h-[60px]'>
                    {/* {isMobile && (
                        <Button variant='ghost' onClick={toggleSidebar}>
                            <Menu />
                        </Button>
                    )} */}
                    <div className='ml-2 w-full flex-1'>
                        <span className='text-sm lg:text-xl xl:text-2xl'>Alex Westerman</span>
                    </div>

                    <MainNav />
                    {/* <NavigationMenu>
                        <NavigationMenuList>
                            {items.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <Link href={item.url} legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {item.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu> */}
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
                <div className='flex items-center'>{/* <SiteFooter /> */}</div>
            </main>
        </div>
    );
};

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <LayoutInternal>{children}</LayoutInternal>;
}
