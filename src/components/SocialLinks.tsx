import { Alert, Box, Divider, IconButton, Snackbar, Tooltip, Typography } from '@mui/material';
import Image from 'mui-image';
import React from 'react';
import { FaEnvelope, FaGithub, FaKey, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pfp from '../assets/img/pfp.webp';
import gpgkey from '../assets/json/gpg_key.json';

export const SocialLinks = () => {
	const [gpgCopiedShown, setGpgCopiedShown] = React.useState(false);

	const copyGpgKey = () => {
		navigator.clipboard.writeText(gpgkey.pub_key);
		setGpgCopiedShown(true);
	};

	//Styles
	const pictueBoxStyle = {
		borderRadius: '50%',
		border: '0.5rem solid #202020',
		width: '8.5rem',
		transition: 'all 0.3s ease-in-out',
		margin: 'auto',
		'&:hover': { borderColor: '#43a047' },
	};
	const nameStyle = {
		textDecoration: 'none',
		color: 'white',
		margin: 'auto',
		'&:hover': { color: 'white', textDecoration: 'none' },
	};

	const pictureBox = (
		<Box
			component={Link}
			to='/'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				textDecoration: 'none',
			}}>
			<Box sx={pictueBoxStyle}>
				<Image src={Pfp} duration={0} style={{ borderRadius: '50%', width: '7.5rem' }} />
			</Box>
			<Typography component='h6' variant='h6' sx={nameStyle}>
				Alex Westerman
			</Typography>
		</Box>
	);

	return (
		<Box sx={{ backgroundColor: '#303030' }}>
			{pictureBox}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Tooltip title='Twitter'>
					<IconButton href='https://twitter.com/_FaceFTW'>
						<FaTwitter />
					</IconButton>
				</Tooltip>
				<Tooltip title='Github'>
					<IconButton href='https://github.com/FaceFTW'>
						<FaGithub />
					</IconButton>
				</Tooltip>
				<Tooltip title='Email'>
					<IconButton href='mailto:alex@faceftw.dev'>
						<FaEnvelope />
					</IconButton>
				</Tooltip>
				<Tooltip title='Linkedin'>
					<IconButton href='https://www.linkedin.com/in/faceftw'>
						<FaLinkedin />
					</IconButton>
				</Tooltip>
				<Tooltip title='GPG Key'>
					<IconButton onClick={copyGpgKey}>
						<FaKey />
					</IconButton>
				</Tooltip>
			</Box>
			<Divider sx={{ marginTop: '1rem' }} />
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={gpgCopiedShown}
				autoHideDuration={6000}
				onClose={() => setGpgCopiedShown(false)}>
				<Alert onClose={() => setGpgCopiedShown(false)} severity='info'>
					Copied GPG Key to Clipboard
				</Alert>
			</Snackbar>
		</Box>
	);
};
