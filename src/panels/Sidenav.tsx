import {
	Box,
	Typography,
	Tooltip,
	IconButton,
	Icon,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Pfp from '../assets/img/pfp.webp';

export default function SidenavPanel() {
	return (
		<div>
			<Box>
				<div className="profile">
					<img src={Pfp} alt="" className="pfp" />
					<Link to={'/'}>
						<Typography component="h1" variant="h6" sx={{ textAlign: 'center', textDecoration: 'none' }}>
							Alex Westerman
						</Typography>
					</Link>
					<div className="social-links">
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
							<a href="mailto:awesterman16@live.com">
								<IconButton>
									<Icon className="nf-mdi-email" />
								</IconButton>
							</a>
						</Tooltip>

						<Tooltip title="GPG Key">
							{/* <a href="https://github.com/rhit-westeraj"> */}
							<IconButton>
								<Icon className="nf-mdi-key_variant" />
							</IconButton>
							{/* </a> */}
						</Tooltip>
					</div>
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
		</div>
	);
}
