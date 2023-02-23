import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	Paper,
	ThemeProvider,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, Outlet, useMatch, useMatches } from 'react-router-dom';
import './Layout.css';
import { Sidenav } from './components/Sidenav';
import { appTheme } from './theme';

const drawerWidth = 240;

export const Layout = () => {
	const [drawerOpen, setDrawerOpen] = React.useState(true);
	const mobileQuery = useMediaQuery('(max-width:768px)');
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

	const matches = useMatches();

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const footer = (
		<Paper
			component={'footer'}
			elevation={5}
			sx={{ display: 'block', margin: '1rem auto', textAlign: 'center', bottom: 0, width: '80%' }}>
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
						width: { xs: '100%', md: `calc(100% - calc(${drawerWidth}px))` },
						marginLeft: { xs: 0, md: `${drawerWidth}px` },
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

			<Box sx={{ d: 'flex' }}>
				<Box>
					<Box component='nav' sx={{ w: { md: `${drawerWidth}px` }, flexShrink: { md: 0 } }}>
						<Drawer
							anchor='left'
							variant={mobileQuery ? 'temporary' : 'permanent'}
							open={drawerOpen}
							sx={{
								display: mobileQuery ? { xs: 'block', md: 'none' } : { xs: 'none', md: 'block' },
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
						width: { md: `calc(100% - ${drawerWidth}px)` },
						marginLeft: { md: `${drawerWidth}px` },
						flexGrow: 1,
					}}>
					<Outlet />
					<Box sx={{ height: 'auto', marginY: 'auto', flexGrow: 1 }} />
					<Box>{footer}</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
};
