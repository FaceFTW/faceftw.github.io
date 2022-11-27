import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import projectData from '../assets/json/projects.json';
import ProjectCard from '../components/ProjectCard';
import FooterPanel from './Footer';

interface CarouselSetProps {
	projects: Project[];
}

const CarouselSet = ({ projects }: CarouselSetProps) => {
	return (
		<Grid container spacing={3} alignItems="stretch">
			{projects.map((project, index) => (
				<Grid key={index} item xs={12} lg={6} xl={4} sx={{ display: 'flex', justifyContent: 'center' }}>
					<ProjectCard project={project} />
				</Grid>
			))}
		</Grid>
	);
};
export default function MainPanel() {
	const projects: Project[] = projectData.projectList;
	const featured = [projects[15], projects[6], projects[18], projects[7], projects[17], projects[14]];
	const mdQuery = useMediaQuery('(min-width: 992px)');
	const lgQuery = useMediaQuery('(min-width: 1200px)');

	const carouselItems = React.useMemo(() => {
		if (lgQuery) {
			return [featured.slice(0, 3), featured.slice(3, 6)];
		} else if (mdQuery) {
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
	}, [featured, mdQuery, lgQuery]);

	return (
		<div>
			<section className="intro">
				<div
					className="justify-content-center"
					style={{ paddingTop: '100px', paddingLeft: '100px' }}
					id="hero-container"
				>
					<span className="hero-text">Software Engineer</span>
					<div className="padding-div"> </div>
					<span className="hero-text">Hardware Tinkerer</span>
					<div className="padding-div"> </div>
					<span className="hero-text">Power User</span>
					<div className="padding-div"> </div>
					<span className="hero-text">Tech Enthusiast</span>
				</div>
			</section>
			<section className="projects">
				<Typography variant="h3" sx={{ m: '1rem' }}>
					Featured Projects
				</Typography>
				<Box>
					<Carousel swipe duration={250} interval={20000} animation="slide">
						{carouselItems.map((items, index) => (
							<CarouselSet key={index} projects={items} />
						))}
					</Carousel>
				</Box>
			</section>
			<Divider sx={{ marginTop: '2rem' }} />
			<FooterPanel />
		</div>
	);
}
