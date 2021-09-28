import { Injectable } from "@angular/core";

import projectList from "src/assets/json/projects.json";

export const enum StatusEnum {
	ARCHIVED = "Archived",
	FINISHED = "Finished",
	FINISHED_PRIV = "Finished (Private Work)",
	ACTIVE_DEVEL = "Active Development",
	SUSPENDED = "Suspended",
}

export const enum LinkTypeEnum {
	TEXT = "text",
	GITHUB = "github",
	DEMO = "demo",
	MISC = "misc",
}

export interface ProjectLink {
	linkType: string;
	linkURL?: string;
	linkDesc?: string;
	text?: string;
}

export interface ProjectStatus {
	status: string;
	reason?: string;
}

export interface Project {
	projectId: number;
	projectName: string;
	projectDescription: string;
	projectSubDesc: string;
	projectLanguage: string[];
	projectLibraries?: string[];
	projectAsset?: string;
	projectLinks: ProjectLink[];
	projectStatus: ProjectStatus;
}

@Injectable({
	providedIn: "root",
})
export class ProjectsService {
	projects: Project[] = projectList.projectList;
}
