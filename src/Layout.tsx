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
import { Link, Outlet, useMatch } from 'react-router-dom';
import './Layout.css';
import { Sidenav } from './components/Sidenav';

const drawerWidth = 240;

const themeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: green[600],
			dark: green[600],
		},
		secondary: {
			main: green[600],
			dark: green[600],
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: green[600],
				},
			},
		},
	},
};

const appTheme = createTheme(themeOptions, { palette: { mode: 'dark' } });

export const Layout = () => {
	const [drawerOpen, setDrawerOpen] = React.useState(true);
	const mobileQuery = useMediaQuery(appTheme.breakpoints.down('lg'));
	const atProjectsRoute = useMatch('/projects');
	const atResumeRoute = useMatch('/resume');
	const atAboutRoute = useMatch('/about');

	const titleMemo = React.useMemo(() => {
		if (atProjectsRoute) {
			return 'Projects';
		} else if (atResumeRoute) {
			return 'Resume';
		} else if (atAboutRoute) {
			return 'About';
		} else {
			return 'Home';
		}
	}, [atProjectsRoute, atResumeRoute, atAboutRoute]);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const footer = (
		<Paper
			component={'footer'}
			elevation={5}
			sx={{ display: 'block', margin: '1rem auto', textAlign: 'center', width: '80%' }}>
			<Typography variant='caption'>
				Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights Reserved.{' '}
			</Typography>
			<br />
			<Typography variant='caption'> Source code for this website is licensed under the MIT License</Typography>
			<br />
			<Typography variant='caption'>
				All projects mentioned are subject to their specific licenses and copyrights as designated by their owners
			</Typography>
			<br />
			<div className='footerTxt'>
				<Typography
					component={Link}
					variant={'caption'}
					to='/err_404'
					sx={{ textDecoration: 'none', color: '#404040' }}>
					super secret link :)
				</Typography>
			</div>
		</Paper>
	);

	return (
		<ThemeProvider theme={appTheme}>
			<Box sx={{ d: 'flex' }}>
				<CssBaseline enableColorScheme />
				<AppBar
					color='secondary'
					position='sticky'
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
							sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
							{titleMemo}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box>
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
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { lg: `calc(100% - ${drawerWidth}px)` },
					marginLeft: { lg: `${drawerWidth}px` },
				}}>
				<Outlet />
				<Box>{footer}</Box>
			</Box>
		</ThemeProvider>
	);
};
