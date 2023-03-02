import { Box, Typography } from '@mui/material';
import TypewriterComponent from 'typewriter-effect';

export const HomeMainSection = () => {
	const backgroundImage = new URL('../assets/img/setupv2.webp', import.meta.url).href;

	return (
		<Box
			component={'section'}
			sx={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Box sx={{ m: 'auto' }} />
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ m: 'auto' }} />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignContent: 'center',
						background: '#303030',
						opacity: '0.75',
					}}>
					<Typography variant='h1' sx={{ color: '#FFFFFFFF' }}>
						I am a{' '}
					</Typography>
					<Typography variant='h1' sx={{ color: '#20FF20' }}>
						<TypewriterComponent
							options={{
								strings: ['Software Engineer', 'Hardware Tinkerer', 'Power User', 'Tech Enthusiast'],
								autoStart: true,
								loop: true,
							}}
						/>
					</Typography>
				</Box>
				<Box sx={{ m: 'auto' }} />
			</Box>
			<Box sx={{ m: 'auto' }} />
		</Box>
	);
};
