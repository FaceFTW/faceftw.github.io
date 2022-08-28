import {
	Alert,
	Box,
	Divider,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Snackbar,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Pfp from '../assets/img/pfp.webp';
import gpgkey from '../assets/json/gpg_key.json';

export default function SidenavPanel() {
	const [gpgCopiedShown, setGpgCopiedShown] = React.useState(false);

	return (
		<div>
			<Box className="sidenav">
				<div className="profile">
					<img src={Pfp} alt="" className="pfp" />
					<Link to={'/'} className="link">
						<Typography component="h6" variant="h6" sx={{ textAlign: 'center', textDecoration: 'none' }}>
							Alex Westerman
						</Typography>
					</Link>
					<Box className="social-links" sx={{ display: 'flex', justifyContent: 'center' }}>
						<Tooltip title="Twitter">
							<a href="https://twitter.com/_FaceFTW">
								<IconButton>
									<Icon className="nf-mdi-twitter" />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="Github">
							<a href="https://github.com/rhit-westeraj">
								<IconButton>
									<Icon className="nf-fa-github" />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="Email">
							<a href="mailto:alex@faceftw.dev">
								<IconButton>
									<Icon className="nf-mdi-email" />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="GPG Key">
							<a href="#">
								<IconButton
									onClick={() => {
										navigator.clipboard.writeText(gpgkey.pub_key);
										setGpgCopiedShown(true);
									}}
								>
									<Icon className="nf-mdi-key_variant" />
								</IconButton>
							</a>
						</Tooltip>
					</Box>
				</div>
			</Box>
			<Divider />
			<List>
				<ListItem button component={Link} to="/">
					<ListItemIcon>
						<Icon className="nf-mdi-home" />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button component={Link} to="/projects">
					<ListItemIcon>
						<Icon className="nf-dev-code" />
					</ListItemIcon>
					<ListItemText primary="Projects" />
				</ListItem>
				<ListItem button component={Link} to="/resume">
					<ListItemIcon>
						<Icon className="nf-fa-file_text_o" />
					</ListItemIcon>
					<ListItemText primary="Resume" />
				</ListItem>
				<ListItem button component={Link} to="/about">
					<ListItemIcon>
						<Icon className="nf-fa-user_circle_o" />
					</ListItemIcon>
					<ListItemText primary="About" />
				</ListItem>
			</List>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={gpgCopiedShown}
				autoHideDuration={6000}
				onClose={() => setGpgCopiedShown(false)}
			>
				<Alert onClose={() => setGpgCopiedShown(false)} severity="info">
					Copied GPG Key to Clipboard
				</Alert>
			</Snackbar>
		</div>
	);
}
