import { Component, OnInit } from "@angular/core";
import { Project, ProjectsService } from "../projects/projects.service";
import { ResponsiveUIService } from "../responsive-ui.service";

const featuredProject1Id = 5;
const featuredProject2Id = 1;
const featuredProject3Id = 2;

const nullAssetPath = "/assets/img/no_asset.webp";
const assetPath = "/assets/img/";
@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	featuredProject1: Project;
	featuredProject2: Project;
	featuredProject3: Project;

	featured: Project[];

	isMobile: boolean;

	constructor(projectSingleton: ProjectsService, private ui: ResponsiveUIService) {
		this.featuredProject1 = projectSingleton.projects[featuredProject1Id];
		this.featuredProject2 = projectSingleton.projects[featuredProject2Id];
		this.featuredProject3 = projectSingleton.projects[featuredProject3Id];

		this.featured = [this.featuredProject1, this.featuredProject2, this.featuredProject3];

		this.isMobile = ui.isMobile;
		this.ui.isMobile$.subscribe((isMobile) => (this.isMobile = isMobile));
	}

	ngOnInit(): void {}

	correctAssetPath(project: Project): string {
		if (!project.projectAsset) {
			return nullAssetPath;
		} else {
			return assetPath + project.projectAsset;
		}
	}
}
