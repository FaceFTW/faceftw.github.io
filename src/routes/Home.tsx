import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Project } from '../DataTypes';
import projectData from '../assets/json/projects.json';
import { HomeMainSection } from '../components/HomeMainSection';
import { ProjectCarouselCard } from '../components/ProjectCarouselCard';

const CarouselSet = ({ projects }: { projects: Project[] }) => {
	return (
		<Grid container spacing={1}>
			<Grid item xs={1} sm={3} lg={2} />
			{projects.map((project) => (
				<Grid item xs={10} sm={6} lg={4} key={project.projectName}>
					<ProjectCarouselCard project={project} />
				</Grid>
			))}
			<Grid item xs={1} sm={3} lg={2} />
		</Grid>
	);
};

export const HomePanel = () => {
	const projects: Project[] = projectData.projectList;
	const featured = [projects[14], projects[18], projects[7], projects[17], projects[20], projects[15]];
	const theme = useTheme();
	const lgQuery = useMediaQuery(theme.breakpoints.down('lg'));

	const carouselItems = React.useMemo(() => {
		if (!lgQuery) {
			return [featured.slice(0, 2), featured.slice(2, 4), featured.slice(4, 6)];
		} else {
			return [
				featured.slice(0, 1),
				featured.slice(1, 2),
				featured.slice(2, 3),
				featured.slice(3, 4),
				featured.slice(4, 5),
				featured.slice(5, 6),
			];
		}
	}, [featured, lgQuery]);

	return (
		<Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			<HomeMainSection />
			<Box component={'section'}>
				<Typography variant='h3' sx={{ m: '1rem' }}>
					Featured Projects
				</Typography>
				<Box>
					<Carousel swipe duration={250} interval={20000} animation='slide'>
						{carouselItems.map((items, index) => (
							<CarouselSet key={index} projects={items} />
						))}
					</Carousel>
				</Box>
			</Box>
		</Box>
	);
};
