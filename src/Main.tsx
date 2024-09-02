//The following is derived from the shadcn/ui dashboard-02 building blocks
//https://ui.shadcn.com/blocks#dashboard-02
import { CircleUser, Home, Menu, MoonStar, Rss, ScrollText, SquareDashedBottomCode, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactDOM from 'react-dom/client';
import { Route, Switch, Link, useLocation } from 'wouter';
import { BlogPanel } from '@/routes/Blog';
import { BlogPagePanel } from '@/routes/BlogPage';

const HomePanel = React.lazy(() => import('@/routes/Home').then((module) => ({ default: module.HomePanel })));
const ProjectsPanel = React.lazy(() =>
    import('@/routes/Projects').then((module) => ({ default: module.ProjectsPanel }))
);
const ResumePanel = React.lazy(() => import('@/routes/Resume').then((module) => ({ default: module.ResumePanel })));
const AboutPanel = React.lazy(() => import('@/routes/About').then((module) => ({ default: module.AboutPanel })));
const Error404Panel = React.lazy(() =>
    import('@/routes/Error404').then((module) => ({ default: module.Error404Panel }))
);

const SuspenseRoute = ({ children }: { children: React.ReactNode }) => {
    // biome-ignore lint/complexity/noUselessFragments: need an empty fragment here
    return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
};

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
                <Link to='/' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <Home className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Home</span>
                </Link>,
                'Home'
            )}
            {wrapWithToolTip(
                <Link to='/projects' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <SquareDashedBottomCode className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Projects</span>
                </Link>,
                'Projects'
            )}
            {wrapWithToolTip(
                <Link to='/resume' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <ScrollText className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Resume</span>
                </Link>,
                'Resume'
            )}
            {wrapWithToolTip(
                <Link to='/blog' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <Rss className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>Blog (Under Construction)</span>
                </Link>,
                'Blog (Under Construction)'
            )}
            {wrapWithToolTip(
                <Link to='/about' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
                    <CircleUser className='h-5 w-5 xl:h-10 xl:w-10' />
                    <span className={sidenavTextClass}>About</span>
                </Link>,
                'About'
            )}
        </nav>
    );
};

const SiteFooter = () => {
    return (
        <footer className='mx-auto mb-4 block w-[80%]'>
            <Card className='flex'>
                <CardContent className='mx-auto mt-4 flex text-wrap'>
                    <caption>
                        <pre className='text-wrap'>
                            Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights
                            Reserved. {'\n'}
                            Source code for this website is licensed under the MIT License {'\n'}
                            All projects mentioned are subject to their specific licenses and copyrights as designated
                            by their owners
                            {'\n\n'}
                            <Link to='/funny' className='text-gray-500 text-sm decoration-muted'>
                                super secret link
                            </Link>
                        </pre>
                    </caption>
                </CardContent>
            </Card>
        </footer>
    );
};

const SiteRouter = () => {
    return (
        <Switch>
            <Route path='/'>
                <SuspenseRoute>
                    <HomePanel />
                </SuspenseRoute>
            </Route>
            <Route path='/projects'>
                <SuspenseRoute>
                    <ProjectsPanel />
                </SuspenseRoute>
            </Route>
            <Route path='/resume'>
                <SuspenseRoute>
                    <ResumePanel />
                </SuspenseRoute>
            </Route>
            <Route path='/about'>
                <SuspenseRoute>
                    <AboutPanel />
                </SuspenseRoute>
            </Route>
            <Route path='/blog'>
                <SuspenseRoute>
                    <BlogPanel />
                </SuspenseRoute>
            </Route>
            <Route path='/blog/:postId'>
                <SuspenseRoute>
                    <BlogPagePanel />
                </SuspenseRoute>
            </Route>
            <Route>
                <SuspenseRoute>
                    <Error404Panel />
                </SuspenseRoute>
            </Route>
        </Switch>
    );
};

const Layout = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //Move sheet open/close state up
    const [openSheet, setOpenSheet] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(prefersDark);
    const [location, _] = useLocation();

    const titleMemo = React.useMemo(() => {
        const title = location.split('/')[1];
        return title === '' ? '' : ` - ${title.charAt(0).toUpperCase()}${title.slice(1)}`;
    }, [location]);

    const sheetClickCloseTrigger = () => {
        setOpenSheet(false);
    };

    React.useEffect(() => {
        darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className='flex flex-col'>
            <header className='flex h-[44px] items-center gap-2 border-b bg-muted/40 lg:gap-4 xl:h-[60px]'>
                <div className='flex pl-1 xl:pl-4'>
                    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                        <SheetTrigger asChild>
                            <Button variant='ghost' size='icon' className='shrink-0'>
                                <Menu className='h-5 w-5 xl:h-7 xl:w-7' />
                                <span className='sr-only'>Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left' className='flex flex-col'>
                            <SidenavLinks showText closeSidebarTrigger={sheetClickCloseTrigger} />
                            <div className='mt-auto' />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='w-full flex-1'>
                    <span className='lg:text-xl xl:text-2xl'>Alex Westerman{titleMemo}</span>
                </div>
                <div className='flex pr-2'>
                    <Button variant='ghost' onClick={() => setDarkMode(!darkMode)} aria-label='Change Light/Dark Mode'>
                        {darkMode && <MoonStar />}
                        {!darkMode && <Sun />}
                    </Button>
                </div>
            </header>
            <div className='grid min-h-screen w-full md:grid-cols-[44px_1fr] xl:grid-cols-[64px_1fr]'>
                <div className='hidden border-r bg-muted/40 md:block'>
                    {/* biome-ignore lint/nursery/useSortedClasses: lint broken? */}
                    <div className='hidden md:flex md:flex-col md:h-[calc(100% - 44px)] md:max-h-[calc(100vh-44px)] md:gap-2'>
                        <div className='flex-1'>
                            <SidenavLinks />
                        </div>
                    </div>
                </div>
                <main className='flex flex-1 flex-col'>
                    <SiteRouter />
                    <div className='flex items-center'>
                        <SiteFooter />
                    </div>
                </main>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>
);
