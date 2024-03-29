import { Box, Divider, Grid } from '@mui/material';
import React from 'react';
import projectData from '../assets/json/projects.json';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../DataTypes';

export const ProjectsPanel = () => {
	const projects: Project[] = projectData.projectList;

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
			<Grid container spacing={3} alignItems='stretch'>
				{projects.map((project, index) => (
					<Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
						<ProjectCard project={project} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
