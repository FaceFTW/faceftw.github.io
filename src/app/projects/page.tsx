import projectData from '@/app/projects/projects.json';
import ProjectCard from '@/components/card-project';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

export default function ProjectsPanel() {
    const projects: Project[] = projectData.projectList;

    return (
        <div className='justify-content m-8 flex items-center'>
            <div className='mx-auto' />
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.projectName} />
                ))}
            </div>
            <div className='mx-auto' />
        </div>
    );
}

export const metadata: Metadata = {
    title: "Projects - Alex's Website",
};
