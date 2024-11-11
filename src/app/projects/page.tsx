import projectData from '@/app/projects/projects.json';
import ProjectCard from '@/components/card-project';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

export default function ProjectsPanel() {
    const projects: Project[] = projectData.projectList;

    return (
        <div>
			<h1 className='text-2xl'>Projects</h1>
            <div className='justify-content m-4 flex items-center'>
                <div className='grid flex-grow grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {projects.map((project) => (
                        <ProjectCard project={project} key={project.projectName} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const metadata: Metadata = {
    title: "Projects - Alex's Website",
};
