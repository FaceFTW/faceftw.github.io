import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Image from 'mui-image';
import { motion } from 'framer-motion';

export const Error404Panel = () => {
	const imageNum = Math.floor(Math.random() * 19);
	const imageSrc = new URL(`../assets/img/404/err_${imageNum}.webp`, import.meta.url).href;
	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Typography variant='h1'>Oops...</Typography>
			<br />
			<Typography variant='body1'>You seem to have navigated to a page that doesn&apos;t exist yet...</Typography>
			<Typography variant='body1'>
				You can <Link to='/'>go back to the home page</Link> or enjoy this funny meme I have:
			</Typography>
			<Box sx={{ margin: '1rem 0rem' }}>
				<Image src={imageSrc} alt='404' width={400} duration={500} />
			</Box>
		</Box>
	);
};
