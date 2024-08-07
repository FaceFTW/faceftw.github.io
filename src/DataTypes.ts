/***************PROJECT TYPES*******************/
export enum StatusEnum {
    ARCHIVED = 'Archived',
    FINISHED = 'Finished',
    FINISHED_PRIV = 'Finished (Private Work)',
    ACTIVE_DEVEL = 'Active Development',
    SUSPENDED = 'Suspended',
}

export enum LinkTypeEnum {
    TEXT = 'text',
    GITHUB = 'github',
    DEMO = 'demo',
    MISC = 'misc',
}

export interface ProjectLink {
    linkType: string;
    linkURL?: string;
    linkDesc?: string;
    text?: string;
}

export interface Project {
    projectId: number;
    projectName: string;
    projectDescription: string;
    projectAsset?: string;
    projectLinks: ProjectLink[];
    projectTags: string[];
}

/***************RESUME TYPES*******************/
export interface Gpa {
    unweighted: number;
    weighted: number;
}

export interface ProfessionalExperience {
    name: string;
    position: string;
    timeEmployed?: string;
    location?: string;
    responsibilities: string[];
}

export interface Education {
    name: string;
    graduationDate: string;
    degree: string[];
    degreeAddendum?: string;
    gpa?: Gpa;
    relCoursework: string[];
    propCoursework?: string[];
}

export interface SkillCategory {
    categoryName: string;
    highSkill?: string[];
    medSkill?: string[];
    lowSkill?: string[];
}

export interface Skill {
    name: string;
    years: number;
    description?: string;
}

export interface ResumeHighlight {
    icon: string;
    stat: string;
    statDescription: string;
}

export interface Resume {
    $schema: string;
    highlights: ResumeHighlight[];
    skillCategories: SkillCategory[];
    skills: Skill[];
    education: Education[];
    experience: ProfessionalExperience[];
}
