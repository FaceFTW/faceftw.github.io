//The following is derived from the shadcn/ui dashboard-02 building blocks
//https://ui.shadcn.com/blocks#dashboard-02
import { CircleUser, Home, Menu, Rss, ScrollText, SquareDashedBottomCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider } from './components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

const SidenavLinks = ({
	showText = false,
	closeSidebarTrigger = () => {},
}: {
	showText?: boolean;
	closeSidebarTrigger?: () => void;
}) => {
	const sidebarNavItemClass =
		'flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground';
	const sidenavTextClass = showText ? 'visible' : 'sr-only';

	const wrapWithToolTip = (elements: React.ReactNode, text: String) => {
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
		<nav className='grid gap-2 md:text-lg md:font-medium left-0 xl:text-xl'>
			{wrapWithToolTip(
				<RouterLink to='/' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
					<Home className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Home</span>
				</RouterLink>,
				'Home'
			)}
			{wrapWithToolTip(
				<RouterLink to='/projects' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
					<SquareDashedBottomCode className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Projects</span>
				</RouterLink>,
				'Projects'
			)}
			{wrapWithToolTip(
				<RouterLink to='/resume' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
					<ScrollText className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Resume</span>
				</RouterLink>,
				'Resume'
			)}
			{wrapWithToolTip(
				<RouterLink to='#' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
					<Rss className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Blog (Under Construction)</span>
				</RouterLink>,
				'Blog (Under Construction)'
			)}
			{wrapWithToolTip(
				<RouterLink to='/about' className={sidebarNavItemClass} onClick={closeSidebarTrigger}>
					<CircleUser className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>About</span>
				</RouterLink>,
				'About'
			)}
		</nav>
	);
};

const SiteFooter = () => {
	return (
		<footer className='block w-[80%] mx-auto mb-4'>
			<Card className='flex'>
				<CardContent className='flex mx-auto mt-4 text-wrap'>
					<caption>
						<pre className='text-wrap'>
							Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights Reserved.{' '}
							{'\n'}
							Source code for this website is licensed under the MIT License {'\n'}
							All projects mentioned are subject to their specific licenses and copyrights as designated by their owners
							{'\n\n'}
							<RouterLink to='/funny' className='decoration-muted text-sm text-gray-500'>
								super secret link
							</RouterLink>
						</pre>
					</caption>
				</CardContent>
			</Card>
		</footer>
	);
};

export const Layout = () => {
	//Move sheet open/close state up
	const [openSheet, setOpenSheet] = React.useState(false);
	const currentLocation = useLocation();

	const titleMemo = React.useMemo(() => {
		const title = currentLocation.pathname.split('/')[1];
		return title === '' ? '' : ' - ' + title.charAt(0).toUpperCase() + title.slice(1);
	}, [currentLocation.pathname]);

	const sheetClickCloseTrigger = () => {
		setOpenSheet(false);
	};

	return (
		<div className='flex flex-col'>
			<header className='flex items-center gap-2 lg:gap-4 border-b bg-muted/40 h-[44px] xl:h-[60px]'>
				<div className='flex pl-1 xl:pl-4'>
					<Sheet open={openSheet} onOpenChange={setOpenSheet}>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon' className='shrink-0 '>
								<Menu className='h-5 w-5 xl:h-7 xl:w-7' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='flex flex-col'>
							<SidenavLinks showText closeSidebarTrigger={sheetClickCloseTrigger} />
							<div className='mt-auto'></div>
						</SheetContent>
					</Sheet>
				</div>
				<div className='w-full flex-1'>
					{/* <RouterLink to='/' className='flex items-center gap-2 font-semibold'> */}
					<span className='lg:text-xl xl:text-2xl'>Alex Westerman{titleMemo}</span>
					{/* </RouterLink> */}
				</div>
			</header>
			<div className='grid min-h-screen w-full md:grid-cols-[44px_1fr] xl:grid-cols-[64px_1fr]'>
				<div className='border-r bg-muted/40 hidden md:block'>
					<div className='hidden md:flex md:h-[calc(100% - 44px)] md:max-h-[calc(100vh-44px)] md:flex-col md:gap-2'>
						<div className='flex-1'>
							<SidenavLinks />
						</div>
					</div>
				</div>
				<main className='flex flex-1 flex-col'>
					<Outlet />
					<div className='flex items-center'>
						<SiteFooter />
					</div>
				</main>
			</div>
		</div>
	);
};
