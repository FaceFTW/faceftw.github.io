import { Component, OnInit } from "@angular/core";
import { ProjectsService, Project } from "./projects.service";

const nullAssetPath = "120.jpg";
const assetPath = "/assets/img/";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
	projects: Project[];
	columnsToDisplay = ["projectName", "projectStatus", "projectLanguage", "projectLibraries"];

	constructor(projectServ: ProjectsService) {
		this.projects = projectServ.projects;
	}

	ngOnInit(): void {}

	correctAssetPath(project: Project): string {
		if (!project.projectAsset) {
			return "/assets/img/120.jpg";
		} else {
			return assetPath + project.projectAsset;
		}
	}
}
