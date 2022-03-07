import { Component, OnInit } from "@angular/core";
import resumeData from "src/assets/json/resume.json";

export interface Highlight {
	icon: string;
	stat: string;
	statDescription: string;
}

export interface Skill {
	categoryName: string;
	lowSkill?: string[];
	medSkill?: string[];
	highSkill?: string[];
}

export interface Education {
	name: string;
	degree: string[];
	degreeAddendum?: string;
	graduationDate: string;
	gpa?: { unweighted: number; weighted: number };
	relCoursework: string[];
	propCoursework?: string[];
}

export interface Experience {
	name: string;
	position: string;
	timeEmployed: string;
	terminationReason?: string;
	location?: string;
	responsibilities: string[];
}

@Component({
	selector: "app-resume",
	templateUrl: "./resume.component.html",
	styleUrls: ["./resume.component.scss"],
})
export class ResumeComponent implements OnInit {
	highlights: Highlight[] = resumeData.highlights;
	skills: Skill[] = resumeData.skills;
	education: Education[] = resumeData.education;
	experience: Experience[] = resumeData.experience;

	constructor() {}

	ngOnInit(): void {}
}
