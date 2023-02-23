import { Box, Divider, List, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { FaCode, FaHome, FaScroll, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';

export const Sidenav = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<SocialLinks />
			<Divider sx={{ marginTop: '1rem' }} />
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
