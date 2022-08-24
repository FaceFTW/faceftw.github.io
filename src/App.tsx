import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ThemeProvider,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AboutPanel from './panels/About';
import Error404Panel from './panels/Error404';
import MainPanel from './panels/Main';
import ProjectsPanel from './panels/Projects';
import ResumePanel from './panels/Resume';
import { appTheme } from './theme';
import Pfp from './assets/img/pfp.webp';

function Layout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}

const drawerWidth = 240;

const sidenav = (
	<div>
		<ThemeProvider theme={appTheme}>
			<Box>
				<div className="profile">
					<img src={Pfp} alt="" className="pfp" />
					<h1 className="navbar-brand">
						<Link to={'/'}>Alex Westerman</Link>
					</h1>
					<div className="social-links">
						{/* <a href="https://twitter.com/_FaceFTW" matTooltip="Twitter"> */}
						{/* <mat-icon fontIcon="nf-mdi-twitter"></mat-icon> */}
						{/* </a> */}
						{/* <a href="https://github.com/rhit-westeraj" matTooltip="Github"> */}
						{/* <mat-icon fontIcon="nf-fa-github"></mat-icon> */}
						{/* </a> */}
						{/* <a href="mailto:awesterman16@live.com" matTooltip="Email"> */}
						{/* <mat-icon fontIcon="nf-mdi-email"></mat-icon> */}
						{/* </a> */}
						{/* <a [cdkCopyToClipboard]="gpgPubKey" (click)="showCopiedSnackBar()" matTooltip="GPG Public Key">
						<mat-icon fontIcon="nf-mdi-key_variant"></mat-icon>
					</a> */}
					</div>
				</div>
			</Box>
			<Divider />
			<List>
				<ListItem button component={Link} to="/">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button component={Link} to="/projects">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Projects" />
				</ListItem>
				<ListItem button component={Link} to="/resume">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Resume" />
				</ListItem>
				<ListItem button component={Link} to="/about">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="About" />
				</ListItem>
			</List>
		</ThemeProvider>
	</div>
);

function App() {
	const [drawerOpen, setDrawerOpen] = React.useState(true);
	const mobileQuery = useMediaQuery('(max-width:975px)');

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<div className="App">
			<ThemeProvider theme={appTheme}>
				<Box sx={{ d: 'flex' }}>
					<CssBaseline enableColorScheme />
					<AppBar
						color='secondary'
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
						{sidenav}
					</Drawer>
				</Box>
				<Box>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<MainPanel />} />
							<Route path="projects" element={<ProjectsPanel />} />
							<Route path="resume" element={<ResumePanel />} />
							<Route path="about" element={<AboutPanel />} />
							<Route path="*" element={<Error404Panel />} />
						</Route>
					</Routes>
				</Box>
			</ThemeProvider>
		</div>
	);
}

export default App;
