import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { Error404Component } from "./error404/error404.component";
import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ResumeComponent } from "./resume/resume.component";

const routes: Routes = [
	{ path: "main", component: HomeComponent },
	{ path: "", redirectTo: "/main", pathMatch: "full" },
	{ path: "about", component: AboutComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "resume", component: ResumeComponent },
	{ path: "**", component: Error404Component },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
