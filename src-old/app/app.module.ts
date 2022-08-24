import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Routed Components
import { Error404Component } from "./error404/error404.component";
import { AboutComponent } from "./about/about.component";
import { ResumeComponent } from "./resume/resume.component";
import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from "./projects/projects.component";
import { FooterComponent } from "./footer/footer.component";
import { MobileUIWarnComponent } from "./mobile-uiwarn/mobile-uiwarn.component";

//Angular Material Components
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from "@angular/material/tooltip";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

//CDK Modules
import { ClipboardModule } from "@angular/cdk/clipboard";

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		ResumeComponent,
		HomeComponent,
		ProjectsComponent,
		Error404Component,
		FooterComponent,
		MobileUIWarnComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		MatListModule,
		MatIconModule,
		MatCardModule,
		MatGridListModule,
		MatButtonModule,
		MatTabsModule,
		MatTableModule,
		MatExpansionModule,
		MatDialogModule,
		MatTooltipModule,
		MatSnackBarModule,
		ClipboardModule,
	],
	providers: [
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
		{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { position: "below" } },
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
