import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// const geistSans = localFont({
//     src: './fonts/GeistVF.woff',
//     variable: '--font-geist-sans',
//     weight: '100 900',
// });
// const geistMono = localFont({
//     src: './fonts/GeistMonoVF.woff',
//     variable: '--font-geist-mono',
//     weight: '100 900',
// });

//The following is derived from the shadcn/ui dashboard-02 building blocks
//https://ui.shadcn.com/blocks#dashboard-02
import type React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import ReactDOM from 'react-dom/client';
// import { Route, Switch, Link, useLocation, Router, useRoute } from 'wouter';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import LayoutSidebar from './layout-client';
import ClientLayout from './layout-client';
// import { usePathname } from 'next/navigation';

// const HomePanel = React.lazy(() => import('@/routes/Home').then((module) => ({ default: module.HomePanel })));
// const ProjectsPanel = React.lazy(() =>
//     import('@/routes/Projects').then((module) => ({ default: module.ProjectsPanel }))
// );
// const ResumePanel = React.lazy(() => import('@/routes/Resume').then((module) => ({ default: module.ResumePanel })));
// const AboutPanel = React.lazy(() => import('@/routes/About').then((module) => ({ default: module.AboutPanel })));
// const Error404Panel = React.lazy(() =>
//     import('@/routes/Error404').then((module) => ({ default: module.Error404Panel }))
// );
// const BlogPanel = React.lazy(() => import('@/routes/Blog').then((module) => ({ default: module.BlogPanel })));
// const BlogPagePanel = React.lazy(() =>
//     import('@/routes/BlogPage').then((module) => ({ default: module.BlogPagePanel }))
// );

// const SuspenseRoute = ({ children }: { children: React.ReactNode }) => {
//     // biome-ignore lint/complexity/noUselessFragments: need an empty fragment here
//     return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
// };

// const SiteRouter = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route path='/'>
//                     <SuspenseRoute>
//                         <HomePanel />
//                     </SuspenseRoute>
//                 </Route>
//                 <Route path='/projects'>
//                     <SuspenseRoute>
//                         <ProjectsPanel />
//                     </SuspenseRoute>
//                 </Route>
//                 <Route path='/resume'>
//                     <SuspenseRoute>
//                         <ResumePanel />
//                     </SuspenseRoute>
//                 </Route>
//                 <Route path='/about'>
//                     <SuspenseRoute>
//                         <AboutPanel />
//                     </SuspenseRoute>
//                 </Route>
//                 <Route path='/blog'>
//                     <SuspenseRoute>
//                         <BlogPanel />
//                     </SuspenseRoute>
//                 </Route>
//                 <Route path='/blog/:postId'>
//                     <SuspenseRoute>
//                         <BlogPagePanel />
//                     </SuspenseRoute>
//                 </Route>
//                 <Route path='/funny'>
//                     <SuspenseRoute>
//                         <Error404Panel />
//                     </SuspenseRoute>
//                 </Route>
//             </Switch>
//         </Router>
//     );
// };

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //todo this may cause flashes

    // const [prefersDark, setPrefersDark] = React.useState(false);
    // React.useEffect(() => {
    //     setPrefersDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    // }, []);

    //Move sheet open/close state up
    // const [openSheet, setOpenSheet] = React.useState(false);
    // const [darkMode, setDarkMode] = React.useState(prefersDark);
    // const [location, _] = usePathname();

    // const titleMemo = React.useMemo(() => {
    //     const title = location.split('/')[1];
    //     return title === '' ? '' : ` - ${title.charAt(0).toUpperCase()}${title.slice(1)}`;
    // }, [location]);

    // const sheetClickCloseTrigger = () => {
    //     setOpenSheet(false);
    // };

    // React.useEffect(() => {
    //     darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    // }, [darkMode]);

    return (
        <html lang='en'>
            <body className={'antialiased'}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}