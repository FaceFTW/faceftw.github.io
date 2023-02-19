import {
	Alert,
	Box,
	Divider,
	List,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Snackbar,
} from '@mui/material';
import React from 'react';
import {FaCode, FaHome, FaScroll, FaUserCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';

export const SidenavPanel = () => {

	return (
		<Box sx={{
			'display': 'flex',
			'flexDirection': 'column',
		}}>
			<SocialLinks />
			<Divider />
			<List>
				<MenuItem component={Link} to='/'>
					<ListItemIcon>
						<FaHome />
					</ListItemIcon>
					<ListItemText primary='Home' />
				</MenuItem>
				<MenuItem component={Link} to='/projects'>
					<ListItemIcon>
						<FaCode />
					</ListItemIcon>
					<ListItemText primary='Projects' />
				</MenuItem>
				<MenuItem component={Link} to='/resume'>
					<ListItemIcon>
						<FaScroll />
					</ListItemIcon>
					<ListItemText primary='Resume' />
				</MenuItem>
				<MenuItem component={Link} to='/about'>
					<ListItemIcon>
						<FaUserCircle />
					</ListItemIcon>
					<ListItemText primary='About' />
				</MenuItem>
			</List>

		</Box>
	);
};

export default SidenavPanel;