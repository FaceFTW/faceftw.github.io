/***************PROJECT TYPES*******************/
declare enum StatusEnum {
	ARCHIVED = "Archived",
	FINISHED = "Finished",
	FINISHED_PRIV = "Finished (Private Work)",
	ACTIVE_DEVEL = "Active Development",
	SUSPENDED = "Suspended",
}

declare enum LinkTypeEnum {
	TEXT = "text",
	GITHUB = "github",
	DEMO = "demo",
	MISC = "misc",
}

declare interface ProjectLink {
	linkType: string;
	linkURL?: string;
	linkDesc?: string;
	text?: string;
}

declare interface ProjectStatus {
	status: string;
	reason?: string;
}

declare interface Project {
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

/***************RESUME TYPES*******************/
declare interface Gpa {
	unweighted: number;
	weighted: number;
}

declare interface ProfessionalExperience {
	name: string;
	position: string;
	timeEmployed?: string;
	location?: string;
	terminationReason?: string;
	responsibilities: string[];
}

declare interface Education {
	name: string;
	graduationDate: string;
	degree: string[];
	degreeAddendum?: string;
	gpa?: Gpa;
	relCoursework: string[];
	propCoursework?: string[];
}

declare interface SkillCategory {
	categoryName: string;
	highSkill?: string[];
	medSkill?: string[];
	lowSkill?: string[];
}

declare interface ResumeHighlight {
	icon: string;
	stat: string;
	statDescription: string;
}

declare interface Resume {
	$schema: string;
	highlights: ResumeHighlight[];
	skills: SkillCategory[];
	education: Education[];
	experience: ProfessionalExperience[];
}
