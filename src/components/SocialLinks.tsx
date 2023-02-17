import {Box, Typography, Tooltip, IconButton} from '@mui/material';
import React from 'react'
import {FaTwitter, FaGithub, FaEnvelope, FaLinkedin, FaKey} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Pfp from '../assets/img/pfp.webp';
import gpgkey from '../assets/json/gpg_key.json';


const SocialLinks = (
{ setGpgCopiedShown} : { setGpgCopiedShown: React.Dispatch<React.SetStateAction<boolean>> },
) => {

  return (
	<Box className='sidenav'>
		<div className='profile'>
			<Link to={'/'}>
				<img src={Pfp} alt='' className='pfp' />
			</Link>
			<Link to={'/'} className='link'>
				<Typography component='h6' variant='h6' sx={{ textAlign: 'center', textDecoration: 'none' }}>
					Alex Westerman
				</Typography>
			</Link>
			<Box className='social-links' sx={{ display: 'flex', justifyContent: 'center' }}>
				<Tooltip title='Twitter'>
					<IconButton href='https://twitter.com/_FaceFTW'>
						<FaTwitter />
					</IconButton>
				</Tooltip>
				<Tooltip title='Github'>
					<IconButton href='https://github.com/rhit-westeraj'>
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
						<IconButton
							onClick={() => {
								navigator.clipboard.writeText(gpgkey.pub_key);
								setGpgCopiedShown(true);
							}}>
							<FaKey />
						</IconButton>
				</Tooltip>
			</Box>
		</div>
	</Box>
)
}

export default SocialLinks