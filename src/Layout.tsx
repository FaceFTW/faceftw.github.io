import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	Paper,
	ThemeOptions,
	ThemeProvider,
	Toolbar,
	Typography,
	createTheme,
	useMediaQuery,
} from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Sidenav } from './components/Sidenav';

const drawerWidth = 240;

const themeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: { main: green[600], dark: green[600] },
		secondary: { main: green[600], dark: green[600] },
	},
};

const appTheme = createTheme(themeOptions, { palette: { mode: 'dark' } });

export const Layout = () => {
	const [drawerOpen, setDrawerOpen] = React.useState(true);
	const mobileQuery = useMediaQuery(appTheme.breakpoints.down('lg'));
	const currentLocation = useLocation();

	const titleMemo = React.useMemo(() => {
		const title = currentLocation.pathname.split('/')[1];
		return title === '' ? '' : ' > ' + title.charAt(0).toUpperCase() + title.slice(1);
	}, [currentLocation.pathname]);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const appBar = (
		<AppBar
			color='secondary'
			position='fixed'
			enableColorOnDark={true}
			sx={{
				width: { xs: '100%', lg: `calc(100% - calc(${drawerWidth}px))` },
				marginLeft: { xs: 0, lg: `${drawerWidth}px` },
			}}>
			<Toolbar color='secondary'>
				<Box hidden={!mobileQuery}>
					<IconButton edge='start' onClick={handleDrawerToggle}>
						<FaBars />
					</IconButton>
				</Box>
				<Typography
					component={Link}
					to='/'
					variant='h6'
					sx={{ marginRight: '0.5rem', textDecoration: 'none', color: 'white' }}>
					Home
				</Typography>
				<Typography variant='h6'>{titleMemo}</Typography>
			</Toolbar>
		</AppBar>
	);

	const footer = (
		<Paper
			component='footer'
			elevation={5}
			sx={{ display: 'block', margin: '1rem auto', textAlign: 'center', width: '80%' }}>
			<Typography variant='caption' component='pre'>
				Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights Reserved. {'\n'}
				Source code for this website is licensed under the MIT License {'\n'}
				All projects mentioned are subject to their specific licenses and copyrights as designated by their owners
				{'\n'}
			</Typography>
			<Typography component={Link} variant='caption' to='/funny' sx={{ textDecoration: 'none', color: '#404040' }}>
				super secret link :)
			</Typography>
		</Paper>
	);

	return (
		<ThemeProvider theme={appTheme}>
			<ScrollRestoration />
			<Box sx={{ d: 'flex' }}>
				<CssBaseline enableColorScheme />
				{appBar}
			</Box>
			<Box component='nav' sx={{ w: { lg: `${drawerWidth}px` }, flexShrink: { lg: 0 } }}>
				<Drawer
					anchor='left'
					variant={mobileQuery ? 'temporary' : 'permanent'}
					open={drawerOpen}
					sx={{
						display: mobileQuery ? { xs: 'block', lg: 'none' } : { xs: 'none', lg: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
							backgroundColor: '#303030',
						},
					}}
					onClose={() => (mobileQuery ? setDrawerOpen(false) : undefined)}>
					<Sidenav />
				</Drawer>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { lg: `calc(100% - ${drawerWidth}px)` },
					marginLeft: { lg: `${drawerWidth}px` },
					paddingTop: '4rem',
				}}>
				<Outlet />

				<Box sx={{ marginY: 'auto' }} />
				<Box>{footer}</Box>
			</Box>
		</ThemeProvider>
	);
};
