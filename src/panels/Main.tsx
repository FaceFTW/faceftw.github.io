import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import projectData from '../assets/json/projects.json';
import ProjectCard from '../components/ProjectCard';

interface CarouselSetProps {
	projects: Project[];
}

const CarouselSet = ({ projects }: CarouselSetProps) => {
	return (
		<Grid container spacing={3} alignItems="stretch">
			{projects.map((project, index) => (
				<Grid key={index} item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
					<ProjectCard project={project} />
				</Grid>
			))}
		</Grid>
	);
};
export default function MainPanel() {
	const projects: Project[] = projectData.projectList;
	const featured = [projects[0], projects[1], projects[2], projects[3], projects[4], projects[5]];

	const carouselItems = [featured.slice(0, 3), featured.slice(3, 6)];

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
					<Carousel swipe duration={250} interval={5000} animation="slide">
						{carouselItems.map((items, index) => (
							<CarouselSet key={index} projects={items} />
						))}
					</Carousel>
				</Box>
			</section>
		</div>
	);
}
