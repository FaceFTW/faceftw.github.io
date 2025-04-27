import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useLockBody } from '@/lib/use-lock-body';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import "@/styles/global.css"

interface Props {
    items: {
        title: string;
        url: string;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        icon: React.ForwardRefExoticComponent<any>;
    }[];
}

interface MobileNavProps {
    children?: React.ReactNode;
    closeFn: React.Dispatch<React.SetStateAction<boolean>>;
    items: {
        title: string;
        url: string;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        icon: React.ForwardRefExoticComponent<any>;
    }[];
}

function MobileNav({ children, closeFn, items }: MobileNavProps) {
    useLockBody();

    return (
        <div
            className={cn(
                'slide-in-from-bottom-80 fixed inset-0 top-10 z-50 grid h-[calc(100vh-4rem)] animate-in grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
            )}>
            <div className='relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-lg'>
                <nav className='grid grid-flow-row auto-rows-max text-sm'>
                    {items.map((item) => (
                        <a
                            key={item.title}
                            href={item.url}
                            onClick={() => closeFn(false)}
                            className='flex w-full items-center gap-2 rounded-md p-2 font-medium text-sm hover:underline'>
                            <item.icon />
                            <span>{item.title}</span>
                        </a>
                    ))}
                </nav>
                {children}
            </div>
        </div>
    );
}

export function AstroNavMenu({ items }: Props) {
    // const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
    // const { resolvedTheme, setTheme } = useTheme();
    // const [mounted, setMounted] = React.useState(false);

    // React.useEffect(() => {
    //     setMounted(true);
    // }, []);

    return (
        <>
            <NavigationMenu className='md:flex'>
                <NavigationMenuList className='gap-6 md:gap-10'>
                    {items?.map((item) => (
                        <NavigationMenuItem key={item.title} className=''>
                            <a
                                href={item.url}
                                className={cn(
                                    'flex font-medium text-lg transition-colors hover:text-foreground/80 sm:text-sm'
                                )}>
                                <span>{item.title}</span>
                            </a>
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
            {showMobileMenu && <MobileNav closeFn={setShowMobileMenu} items={items} />}
        </>
    );
}
