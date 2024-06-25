// import {
// 	AppBar,
// 	Box,
// 	CssBaseline,
// 	Drawer,
// 	IconButton,
// 	Paper,
// 	ThemeOptions,
// 	ThemeProvider,
// 	Toolbar,
// 	Typography,
// 	createTheme,
// 	useMediaQuery,
// } from '@mui/material';
// import { green } from '@mui/material/colors';
// import React from 'react';
// import { FaBars } from 'react-icons/fa';
// import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
// import { Sidenav } from './components/Sidenav';

// const drawerWidth = 240;

// const themeOptions: ThemeOptions = {
// 	palette: {
// 		mode: 'dark',
// 		primary: { main: green[600], dark: green[600] },
// 		secondary: { main: green[600], dark: green[600] },
// 	},
// };

// const appTheme = createTheme(themeOptions, { palette: { mode: 'dark' } });

// export const Layout = () => {
// 	const [drawerOpen, setDrawerOpen] = React.useState(true);
// 	const mobileQuery = useMediaQuery(appTheme.breakpoints.down('lg'));
// 	const currentLocation = useLocation();

// 	const titleMemo = React.useMemo(() => {
// 		const title = currentLocation.pathname.split('/')[1];
// 		return title === '' ? '' : ' > ' + title.charAt(0).toUpperCase() + title.slice(1);
// 	}, [currentLocation.pathname]);

// 	const handleDrawerToggle = () => {
// 		setDrawerOpen(!drawerOpen);
// 	};

// 	const appBar = (
// 		<AppBar
// 			color='secondary'
// 			position='fixed'
// 			enableColorOnDark={true}
// 			sx={{
// 				width: { xs: '100%', lg: `calc(100% - calc(${drawerWidth}px))` },
// 				marginLeft: { xs: 0, lg: `${drawerWidth}px` },
// 			}}>
// 			<Toolbar color='secondary'>
// 				<Box hidden={!mobileQuery}>
// 					<IconButton edge='start' onClick={handleDrawerToggle}>
// 						<FaBars />
// 					</IconButton>
// 				</Box>
// 				<Typography
// 					component={Link}
// 					to='/'
// 					variant='h6'
// 					sx={{ marginRight: '0.5rem', textDecoration: 'none', color: 'white' }}>
// 					Home
// 				</Typography>
// 				<Typography variant='h6'>{titleMemo}</Typography>
// 			</Toolbar>
// 		</AppBar>
// 	);

// 	const footer = (
// 		<Paper
// 			component='footer'
// 			elevation={5}
// 			sx={{ display: 'block', margin: '1rem auto', textAlign: 'center', width: '80%' }}>
// 			<Typography variant='caption' component='pre'>
// 				Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights Reserved. {'\n'}
// 				Source code for this website is licensed under the MIT License {'\n'}
// 				All projects mentioned are subject to their specific licenses and copyrights as designated by their owners
// 				{'\n'}
// 			</Typography>
// 			<Typography component={Link} variant='caption' to='/funny' sx={{ textDecoration: 'none', color: '#404040' }}>
// 				super secret link :)
// 			</Typography>
// 		</Paper>
// 	);

// 	return (
// 		<ThemeProvider theme={appTheme}>
// 			<ScrollRestoration />
// 			<Box sx={{ d: 'flex' }}>
// 				<CssBaseline enableColorScheme />
// 				{appBar}
// 			</Box>
// 			<Box component='nav' sx={{ w: { lg: `${drawerWidth}px` }, flexShrink: { lg: 0 } }}>
// 				<Drawer
// 					anchor='left'
// 					variant={mobileQuery ? 'temporary' : 'permanent'}
// 					open={drawerOpen}
// 					sx={{
// 						display: mobileQuery ? { xs: 'block', lg: 'none' } : { xs: 'none', lg: 'block' },
// 						'& .MuiDrawer-paper': {
// 							boxSizing: 'border-box',
// 							width: drawerWidth,
// 							backgroundColor: '#303030',
// 						},
// 					}}
// 					onClose={() => (mobileQuery ? setDrawerOpen(false) : undefined)}>
// 					<Sidenav />
// 				</Drawer>
// 			</Box>
// 			<Box
// 				sx={{
// 					display: 'flex',
// 					flexDirection: 'column',
// 					width: { lg: `calc(100% - ${drawerWidth}px)` },
// 					marginLeft: { lg: `${drawerWidth}px` },
// 					paddingTop: '4rem',
// 				}}>
// 				<Outlet />

// 				<Box sx={{ marginY: 'auto' }} />
// 				<Box>{footer}</Box>
// 			</Box>
// 		</ThemeProvider>
// 	);
// };

//The following is derived from the shadcn/ui dashboard-02 building blocks
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	Router,
	Rss,
	ScrollText,
	Search,
	ShoppingCart,
	SquareDashedBottomCode,
	Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link as RouterLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider } from './components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

const SidenavLinks = ({ showText = false }: { showText: boolean }) => {
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
				<RouterLink to='/' className={sidebarNavItemClass}>
					<Home className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Home</span>
				</RouterLink>,
				'Home'
			)}
			{wrapWithToolTip(
				<RouterLink to='/projects' className={sidebarNavItemClass}>
					<SquareDashedBottomCode className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Projects</span>
				</RouterLink>,
				'Projects'
			)}
			{wrapWithToolTip(
				<RouterLink to='/resume' className={sidebarNavItemClass}>
					<ScrollText className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Resume</span>
				</RouterLink>,
				'Resume'
			)}
			{wrapWithToolTip(
				<RouterLink to='#' className={sidebarNavItemClass}>
					<Rss className='h-5 w-5 xl:h-10 xl:w-10' />
					<span className={sidenavTextClass}>Blog (Under Construction)</span>
				</RouterLink>,
				'Blog (Under Construction)'
			)}
			{wrapWithToolTip(
				<RouterLink to='/about' className={sidebarNavItemClass}>
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
	return (
		<div className='grid min-h-screen w-full md:grid-cols-[0px_1fr] lg:grid-cols-[44px_1fr] xl:grid-cols-[64px_1fr]'>
			<div className='hidden border-r bg-muted/40 md:block lg:visible md:invisible'>
				<div className='flex h-full max-h-screen flex-col gap-2'>
					<div className='flex md:h-4 items-center border-b lg:h-[44px] xl:h-[60px] xl:px-3'>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon' className='shrink-0 '>
									<Menu className='h-5 w-5 xl:h-7 xl:w-7' />
									<span className='sr-only'>Toggle navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='left' className='flex flex-col'>
								<SidenavLinks showText />
								<div className='mt-auto'></div>
							</SheetContent>
						</Sheet>
					</div>
					<div className='flex-1'>
						<SidenavLinks showText={false} />
					</div>
					<div className='mt-auto p-4'></div>
				</div>
			</div>
			<div className='flex flex-col'>
				<header className='flex h-6 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[44px] xl:h-[60px] lg:px-6'>
					<div className='w-full flex-1'>
						<RouterLink to='/' className='flex items-center gap-2 font-semibold'>
							<Package2 className='h-4 w-4' />
							<span className=''>Alex Westerman</span>
						</RouterLink>
					</div>
				</header>
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
