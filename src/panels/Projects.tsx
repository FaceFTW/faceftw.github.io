import React from 'react';
import projectData from '../assets/json/projects.json';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPanel() {
	const projects: Project[] = projectData.projectList;

	return (
		<div>
			<ProjectCard project={projects[1]} />
		</div>
	);
}
