import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export const RouteSuspenseFallback = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<CircularProgress size={100} />
			<Typography variant='h3' sx={{ ml: '1rem' }}>
				Loading...
			</Typography>
		</Box>
	);
};

export const RouteWithSuspense = ({ children }: { children: React.ReactNode }) => {
	return <React.Suspense fallback={<RouteSuspenseFallback />}>{children}</React.Suspense>;
};
