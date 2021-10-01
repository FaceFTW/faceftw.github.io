import { BreakpointObserver, Breakpoints, MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { fromEvent } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MobileUIWarnComponent } from "./mobile-uiwarn/mobile-uiwarn.component";

const titleFragment = " - Alex Westerman";
const brokenBrkpts = [
	Breakpoints.XSmall,
	Breakpoints.Small,
	Breakpoints.Medium,
	Breakpoints.Handset,
	Breakpoints.HandsetLandscape,
	Breakpoints.HandsetPortrait,
	Breakpoints.Tablet,
	Breakpoints.TabletLandscape,
	Breakpoints.TabletPortrait,
	Breakpoints.WebPortrait,
];
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "Home - Alex Westerman";
	toolbarTitle: String = "Home";

	constructor(
		iconReg: MatIconRegistry,
		private route: ActivatedRoute,
		private titleServ: Title,
		brkpointObs: BreakpointObserver,
		public dialog: MatDialog
	) {
		//Register NerdFonts with Angular Material
		iconReg.registerFontClassAlias("nf");
		iconReg.setDefaultFontSetClass("nf");

		//Breakpoint Observation for Warning about broken mobile ui
		brkpointObs.observe(brokenBrkpts).subscribe((state) => {
			if (state.matches && this.dialog.openDialogs.length === 0) {
				this.dialog.open(MobileUIWarnComponent, {
					width: "480px",
					height:"340px",
					"hasBackdrop":true,
				});
			}
		});
	}

	ngOnInit() {
		//Subscribe to route changes to update toolbar header
		//This is hard coded as there are unlikely to be many more pages
		this.route.url.subscribe((urlSegs) => {
			console.log("urlSegs :>> ", urlSegs);
			switch (urlSegs[0].path) {
				case "main":
					this.titleServ.setTitle("Home" + titleFragment);
					this.toolbarTitle = "Home";
					break;
				case "projects":
					this.titleServ.setTitle("Projects" + titleFragment);
					this.toolbarTitle = "Projects";
					break;
				case "resume":
					this.titleServ.setTitle("Resume" + titleFragment);
					this.toolbarTitle = "Resume";
					break;
				case "about":
					this.titleServ.setTitle("About" + titleFragment);
					this.toolbarTitle = "About";
					break;
			}
		});
	}

	ngOnDestroy(): void {}
}
