import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FooterPanel = () => {
	return (
		<Paper
			component={'footer'}
			elevation={5}
			sx={{ display: 'block', margin: '1rem auto', textAlign: 'center', bottom: 0, width: '80%' }}>
			<Typography variant='caption'>
				Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights Reserved.{' '}
			</Typography>
			<br />
			<Typography variant='caption'> Source code for this website is licensed under the MIT License</Typography>
			<br />
			<Typography variant='caption'>
				All projects mentioned are subject to their specific licenses and copyrights as designated by their owners
			</Typography>
			<br />
			<div className='footerTxt'>
				<Typography
					component={Link}
					variant={'caption'}
					to='/err_404'
					sx={{ textDecoration: 'none', color: '#404040' }}>
					super secret link :)
				</Typography>
			</div>
		</Paper>
	);
};

export default FooterPanel;
