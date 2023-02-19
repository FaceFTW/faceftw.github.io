import {useMediaQuery, ThemeProvider, Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer} from '@mui/material';
import React from 'react';
import {useMatch, Link, Outlet} from 'react-router-dom';
import SidenavPanel from './panels/Sidenav';
import {appTheme} from './theme';
import './Layout.css';
import {FaBars} from 'react-icons/fa';

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
		}
		else if (atResumeRoute) {
			return 'Resume';
		}
		else if (atAboutRoute) {
			return 'About';
		}
		else {
			return 'Home';
		}
	}, [atProjectsRoute, atResumeRoute, atAboutRoute]);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<ThemeProvider theme={appTheme}>
			<Box sx={{d: 'flex'}}>
				<CssBaseline enableColorScheme />
				<AppBar
					color='secondary'
					position='sticky'
					sx={{
						width: {xs: '100%', md: `calc(100% - calc(${drawerWidth}px))`},
						marginLeft: {xs: 0, md: `${drawerWidth}px`},
					}}
				>
					<Toolbar color='secondary'>
						<Box hidden={!mobileQuery}>
							<IconButton edge='start' onClick={handleDrawerToggle} >
								<FaBars />
							</IconButton>
						</Box>
						<Typography
							component={Link} to='/'
							variant='h6'
							sx={{flexGrow: 1, textDecoration: 'none', color: 'white'}}>
							{titleMemo}
						</Typography>

					</Toolbar>
				</AppBar>
			</Box>

			<Box sx={{d: 'block'}}>
				<Box
					sx={{
						width: {md: `calc(100% - ${drawerWidth}px)`},
						marginLeft: {md: `${drawerWidth}px`},
						flexGrow: 0,
					}}
				>
					<Outlet />
				</Box>
				<Box>
					<Box component='nav' sx={{w: {md: `${drawerWidth}px`}, flexShrink: {md: 0}}}>
						<Drawer
							anchor='left'
							variant={mobileQuery ? 'temporary' : 'permanent'}
							ModalProps={{keepMounted: true}}
							open={drawerOpen}
							sx={{
								display: mobileQuery ? {xs: 'block', md: 'none'} : {xs: 'none', md: 'block'},
								'& .MuiDrawer-paper': {
									boxSizing: 'border-box',
									width: drawerWidth,
									backgroundColor: '#303030',
								},
							}}
							onClose={() => (mobileQuery ? setDrawerOpen(false) : undefined)}
						>
							<SidenavPanel />
						</Drawer>
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
};
