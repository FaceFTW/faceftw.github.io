/***************PROJECT TYPES*******************/
export enum LinkType {
	TEXT = 'text',
	GITHUB = 'github',
	DEMO = 'demo',
	MISC = 'misc',
}

export enum ProjectStatusType {
	ARCHIVED = 'Archived',
	FINISHED = 'Finished',
	FINISHED_PRIVATE = 'Finished (Private Work)',
	ACTIVE_DEVELOPMENT = 'Active Development',
	SUSPENDED = 'Suspended',
}

export interface ProjectStatus {
	status: ProjectStatusType;
	reason?: string;
}

export interface ProjectLink {
	linkType: LinkType;
	linkUrl?: string;
	text?: string;
	linkDesc?: string;
}

export interface Project {
	projectId: number;
	projectName: string;
	projectDescription: string;
	projectSubDesc: string;
	projectLanguage: string[];
	projectLibraries: string[];
	projectAsset: string;
	projectLinks: ProjectLink[];
	projectStatus: ProjectStatus;
}

/***************RESUME TYPES*******************/
export interface Gpa {
	unweighted: number;
	weighted: number;
}

export interface ProfessionalExperience {
	name: string;
	position: string;
	timeEmployed: string;
	location: string;
	terminationReason: string;
	responsibilities: string[];
}

export interface Education {
	name: string;
	graduationDate: string;
	degree: string[];
	degreeAddendum: string;
	gpa: Gpa;
	relCoursework: string[];
	propCoursework: string[];
}

export interface SkillCategory {
	categoryName: string;
	highSkill?: string[];
	medSkill?: string[];
	lowSkill?: string[];
}

export interface ResumeHighlight {
	icon: string;
	stat: string;
	statDescription: string;
}

export interface Resume {
	highlights: ResumeHighlight[];
	skills: SkillCategory[];
	education: Education[];
	experience: ProfessionalExperience[];
}

