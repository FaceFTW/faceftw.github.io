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
						Alex is a{' '}
					</Typography>
					<Typography variant='h1' sx={{ color: '#20FF20' }}>
						<TypewriterComponent
							options={{
								autoStart: true,
								loop: true,
							}}
							onInit={(typewriter) => {
								typewriter
									.typeString('Software Engineer')
									.pauseFor(3000)
									.deleteAll()
									.typeString('Hardware Tinkerer')
									.pauseFor(3000)
									.deleteAll()
									.typeString('Power User')
									.pauseFor(3000)
									.deleteAll()
									.typeString('Tech Enthusiast')
									.pauseFor(3000)
									.deleteAll()
									.typeString('Problem Solver')
									.pauseFor(3000)
									.deleteAll()
									.start();
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
