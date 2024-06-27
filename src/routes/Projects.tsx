import projectData from '../assets/json/projects.json';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../DataTypes';

export const ProjectsPanel = () => {
	const projects: Project[] = projectData.projectList;

	return (
		<div className='justify-content m-8 flex items-center'>
			<div className='mx-auto' />
			<div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
				{projects.map((project, index) => (
					<ProjectCard project={project} key={index} />
				))}
			</div>
			<div className='mx-auto' />
		</div>
	);
};
