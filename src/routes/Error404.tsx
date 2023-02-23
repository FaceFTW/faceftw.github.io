import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Error404Panel = () => {
	const imageNum = Math.floor(Math.random() * 19);
	const imageSrc = new URL(`../assets/img/404/err_${imageNum}.webp`, import.meta.url).href;
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
		</Box>
	);
};

export default Error404Panel;
