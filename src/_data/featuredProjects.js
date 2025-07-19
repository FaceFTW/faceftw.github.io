import projects from './projects.json' with { type: 'json' };

export default function () {
    return projects.projectList.filter((project) => {
        return project.projectId === 18 || project.projectId === 11 || project.projectId === 5;
    });
}
