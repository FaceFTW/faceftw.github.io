/* eslint-disable @typescript-eslint/no-var-requires */
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import FooterPanel from './Footer';

const Error404Panel = () => {
	const imageNum = Math.floor(Math.random() * 19);
	const imageSrc = require(`../assets/img/404/err_${imageNum}.webp`);
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Typography variant='h1'>Oops...</Typography>
			<br />
			<Typography variant='body1'>You seem to have navigated to a page that doesn&apos;t exist yet...</Typography>
			<Typography variant='body1'>
				You can <Link to='/'>go back to the home page</Link> or enjoy this funny meme I have:
			</Typography>
			<Box sx={{ margin: '1rem 0rem' }}>
				<img src={imageSrc} alt='404' className='errorimg' />
			</Box>
			<FooterPanel />
		</Box>
	);
};

export default Error404Panel;
