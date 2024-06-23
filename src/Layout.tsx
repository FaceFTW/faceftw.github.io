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
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Link, Outlet } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

export const Layout = () => {
	const sidebar = (
		<nav className='grid gap-2 md:text-lg md:font-medium'>
			<Link to='#' className='flex items-center gap-2 md:text-lg font-semibold'>
				<Package2 className='h-6 w-6' />
				<span className='sr-only'>Acme Inc</span>
			</Link>
			<Link
				to='#'
				className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
				<Home className='h-5 w-5' />
				<span className=''></span>
				Dashboard
			</Link>
			<Link
				to='#'
				className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'>
				<ShoppingCart className='h-5 w-5' />
				Orders
			</Link>
			<Link
				to='#'
				className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
				<Package className='h-5 w-5' />
				Products
			</Link>
			<Link
				to='#'
				className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
				<Users className='h-5 w-5' />
				Customers
			</Link>
			<Link
				to='#'
				className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
				<LineChart className='h-5 w-5' />
				Analytics
			</Link>
		</nav>
	);

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[56px_1fr]'>
			<div className='hidden border-r bg-muted/40 md:block'>
				<div className='flex h-full max-h-screen flex-col gap-2'>
					<div className='flex h-6 items-center border-b px-4 lg:h-[60px] lg:px-6'>
						<Link to='/' className='flex items-center gap-2 font-semibold'>
							<Package2 className='h-4 w-4' />
							<span className=''>Alex Westerman</span>
						</Link>
					</div>
					<div className='flex-1'>{sidebar}</div>
					<div className='mt-auto p-4'></div>
				</div>
			</div>
			<div className='flex flex-col'>
				<header className='flex h-6 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
								<Menu className='h-5 w-5' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='flex flex-col'>
							{sidebar}
							<div className='mt-auto'></div>
						</SheetContent>
					</Sheet>
					<div className='w-full flex-1'>
						<form>
							<div className='relative'>
								<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
								<Input
									type='search'
									placeholder='Search products...'
									className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
								/>
							</div>
						</form>
					</div>
				</header>
				<main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
					<Outlet />
				</main>
			</div>
		</div>
	);
};
