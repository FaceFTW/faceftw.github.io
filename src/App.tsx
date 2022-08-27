import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	IconButton,
	ThemeProvider,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import { Link, Outlet, Route, Routes, useMatch } from 'react-router-dom';
import './App.css';
import AboutPanel from './panels/About';
import Error404Panel from './panels/Error404';
import MainPanel from './panels/Main';
import ProjectsPanel from './panels/Projects';
import ResumePanel from './panels/Resume';
import SidenavPanel from './panels/Sidenav';
import { appTheme } from './theme';

const drawerWidth = 240;

const Layout = () => {
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

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<ThemeProvider theme={appTheme}>
			<Box sx={{ d: 'flex' }}>
				<CssBaseline enableColorScheme />
				<AppBar
					color="secondary"
					position="sticky"
					sx={{
						width: { xs: '100%', md: `calc(100%-${drawerWidth}px)` },
						marginLeft: { xs: 0, md: `${drawerWidth}px` },
					}}
				>
					<Toolbar color="secondary">
						<Box hidden={!mobileQuery}>
							<IconButton edge="start" onClick={handleDrawerToggle}>
								<MenuIcon />
							</IconButton>
						</Box>
						<Link to="/" className='link'>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								{titleMemo}
							</Typography>
						</Link>
					</Toolbar>
				</AppBar>
			</Box>

			<Box sx={{ d: 'block' }}>
				<Box
					sx={{
						width: { md: `calc(100% - ${drawerWidth}px)` },
						marginLeft: { md: `${drawerWidth}px` },
						flexGrow: 0,
					}}
				>
					<Outlet />
				</Box>
				<Box>
					<Box component="nav" sx={{ w: { md: `${drawerWidth}px` }, flexShrink: { md: 0 } }}>
						<Drawer
							anchor="left"
							variant={mobileQuery ? 'temporary' : 'permanent'}
							ModalProps={{ keepMounted: true }}
							open={drawerOpen}
							sx={{
								display: mobileQuery ? { xs: 'block', md: 'none' } : { xs: 'none', md: 'block' },
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

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MainPanel />} />
					<Route path="/projects" element={<ProjectsPanel />} />
					<Route path="/resume" element={<ResumePanel />} />
					<Route path="/about" element={<AboutPanel />} />
					<Route path="*" element={<Error404Panel />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
