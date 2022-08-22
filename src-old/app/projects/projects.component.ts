import { Component, Input, OnInit } from "@angular/core";
import { ProjectsService, Project } from "./projects.service";

const nullAssetPath = "/assets/img/no_asset.webp";
const assetPath = "/assets/img/";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
	projects: Project[];
	columnsToDisplay = ["projectName", "projectStatus", "projectLanguage", "projectLibraries"];
	@Input("isMobile") isMobile: boolean = false;

	constructor(projectServ: ProjectsService) {
		this.projects = projectServ.projects;
	}

	ngOnInit(): void {}

	correctAssetPath(project: Project): string {
		if (!project.projectAsset) {
			return nullAssetPath;
		} else {
			return assetPath + project.projectAsset;
		}
	}

	correctLibrariesList(project: Project): string {
		if (!project.projectLibraries) {
			return "N/A";
		} else {
			return project.projectLibraries.join(", ");
		}
	}
}
