import {
	Alert,
	Box,
	Divider,
	IconButton,
	List,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Snackbar,
	Tooltip,
	Typography
} from '@mui/material';
import React from 'react';
import {FaCode, FaEnvelope, FaGithub, FaHome, FaKey, FaLinkedin, FaScroll, FaTwitter, FaUserCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Pfp from '../assets/img/pfp.webp';
import gpgkey from '../assets/json/gpg_key.json';

export default function SidenavPanel() {
	const [gpgCopiedShown, setGpgCopiedShown] = React.useState(false);

	return (
		<div>
			<Box className="sidenav">
				<div className="profile">
					<Link to={'/'}>
						<img src={Pfp} alt="" className="pfp" />
					</Link>
					<Link to={'/'} className="link">
						<Typography component="h6" variant="h6" sx={{ textAlign: 'center', textDecoration: 'none' }}>
							Alex Westerman
						</Typography>
					</Link>
					<Box className="social-links" sx={{ display: 'flex', justifyContent: 'center' }}>
						<Tooltip title="Twitter">
							<a href="https://twitter.com/_FaceFTW">
								<IconButton>
									<FaTwitter />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="Github">
							<a href="https://github.com/rhit-westeraj">
								<IconButton>
									<FaGithub />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="Email">
							<a href="mailto:alex@faceftw.dev">
								<IconButton>
									<FaEnvelope />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="Linkedin">
							<a href="https://www.linkedin.com/in/faceftw/">
								<IconButton>
									<FaLinkedin />
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
									<FaKey />
								</IconButton>
							</a>
						</Tooltip>
					</Box>
				</div>
			</Box>
			<Divider />
			<List>
				<MenuItem component={Link} to="/">
					<ListItemIcon>
						<FaHome />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</MenuItem>
				<MenuItem component={Link} to="/projects">
					<ListItemIcon>
						<FaCode/>
					</ListItemIcon>
					<ListItemText primary="Projects" />
				</MenuItem>
				<MenuItem component={Link} to="/resume">
					<ListItemIcon>
						<FaScroll/>
					</ListItemIcon>
					<ListItemText primary="Resume" />
				</MenuItem>
				<MenuItem component={Link} to="/about">
					<ListItemIcon>
						<FaUserCircle/>
					</ListItemIcon>
					<ListItemText primary="About" />
				</MenuItem>
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
