import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MobileUIWarnComponent } from "./mobile-uiwarn/mobile-uiwarn.component";
import { Clipboard } from "@angular/cdk/clipboard";
import pub_key from "src/assets/json/gpg_key.json";
import { TooltipComponent } from "@angular/material/tooltip";
import { MatSnackBar } from "@angular/material/snack-bar";

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

	gpgPubKey = pub_key.pub_key;

	constructor(
		iconReg: MatIconRegistry,
		private route: Router,
		private titleServ: Title,
		brkpointObs: BreakpointObserver,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private clipboard: Clipboard
	) {
		//Register NerdFonts with Angular Material
		iconReg.registerFontClassAlias("nf");
		iconReg.setDefaultFontSetClass("nf");

		//Breakpoint Observation for Warning about broken mobile ui
		brkpointObs.observe(brokenBrkpts).subscribe((state) => {
			if (state.matches && this.dialog.openDialogs.length === 0) {
				this.dialog.open(MobileUIWarnComponent, {
					width: "480px",
					height: "340px",
					hasBackdrop: true,
				});
			}
		});
	}

	ngOnInit() {
		//Subscribe to route changes to update toolbar header
		//This is hard coded as there are unlikely to be many more pages
		this.route.events.subscribe(() => {
			switch (this.route.url) {
				case "/main":
					this.titleServ.setTitle("Home" + titleFragment);
					this.toolbarTitle = "Home";
					break;
				case "/projects":
					this.titleServ.setTitle("Projects" + titleFragment);
					this.toolbarTitle = "Projects";
					break;
				case "/resume":
					this.titleServ.setTitle("Resume" + titleFragment);
					this.toolbarTitle = "Resume";
					break;
				case "/about":
					this.titleServ.setTitle("About" + titleFragment);
					this.toolbarTitle = "About";
					break;
				case "/error404":
					this.titleServ.setTitle("404" + titleFragment);
					this.toolbarTitle = "Error 404 - Not Found";
					break;
			}
		});
	}

	ngOnDestroy(): void {}

	showCopiedSnackBar() {
		this._snackBar.open("Copied GPG Key to Clipboard!", "", {
			verticalPosition: "top",
			horizontalPosition: "left",
		});
	}
}
