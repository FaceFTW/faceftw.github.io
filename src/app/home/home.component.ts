import { Component, OnInit } from "@angular/core";
import { Project, ProjectsService } from "../projects/projects.service";

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

	breakpoint: number;

	constructor(projectSingleton: ProjectsService) {
		this.featuredProject1 = projectSingleton.projects[featuredProject1Id];
		this.featuredProject2 = projectSingleton.projects[featuredProject2Id];
		this.featuredProject3 = projectSingleton.projects[featuredProject3Id];

		this.featured = [this.featuredProject1, this.featuredProject2, this.featuredProject3];

		this.breakpoint = 0;
	}

	ngOnInit(): void {
		this.breakpoint = window.innerWidth <= 1200 ? 1 : 3;
	}

	onResize(event: UIEvent) {
		this.breakpoint = window.innerWidth <= 1200 ? 1 : 3;
	}

	correctAssetPath(project: Project): string {
		if (!project.projectAsset) {
			return nullAssetPath;
		} else {
			return assetPath + project.projectAsset;
		}
	}
}
