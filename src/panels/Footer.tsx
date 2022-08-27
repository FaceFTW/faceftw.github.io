import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterPanel() {
	return (
		<Box sx={{ display: 'block', margin: '1rem 0rem', textAlign: 'center' }}>
			<Typography component={'p'}>
				Alex &quot;FaceFTW&quot; Westerman &copy; 2021-2022 All Rights Reserved.{' '}
			</Typography>
			<Typography> Source code for this website is licensed under the MIT License</Typography>
			<br />
			<div className="footerTxt">
				<Link to="/err_404">super secret link :)</Link>
			</div>
		</Box>
	);
}
