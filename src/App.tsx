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
import { Outlet, Route, Routes } from 'react-router-dom';
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
	const mobileQuery = useMediaQuery('(max-width:975px)');

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<ThemeProvider theme={appTheme}>
			<Box sx={{ d: 'flex' }}>
				<CssBaseline enableColorScheme />
				<AppBar
					color="secondary"
					position="static"
					sx={{
						width: { sm: `calc(100%-${drawerWidth}px)` },
						marginLeft: { sm: `${drawerWidth}px` },
					}}
				>
					<Toolbar color="secondary">
						<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							TEMP
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>

			<Box sx={{ d: 'block' }}>
				<Box
					sx={{ width: { sm: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth}px` }, flexGrow: 1 }}
				>
					<Outlet />
				</Box>
				<Box>
					<Box component="nav" sx={{ w: { sm: `${drawerWidth}px` }, flexShrink: { sm: 0 } }}>
						<Drawer
							anchor="left"
							variant={mobileQuery ? 'temporary' : 'permanent'}
							ModalProps={{ keepMounted: true }}
							open={drawerOpen}
							sx={{
								display: mobileQuery ? { xs: 'block', sm: 'none' } : { xs: 'none', sm: 'block' },
								'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
