import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MobileUIWarnComponent } from "./mobile-uiwarn/mobile-uiwarn.component";
import { Clipboard } from "@angular/cdk/clipboard";
import pub_key from "src/assets/json/gpg_key.json";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ResponsiveUIService } from "./responsive-ui.service";

const titleFragment = " - Alex Westerman";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "Home - Alex Westerman";
	toolbarTitle: String = "Home";

	//For times when I am busy and need a quick toggle
	suspendedEnd = new Date(2021, 11, 19);

	gpgPubKey = pub_key.pub_key;

	isMobile: boolean = false;

	constructor(
		iconReg: MatIconRegistry,
		private route: Router,
		private titleServ: Title,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private clipboard: Clipboard,
		private ui: ResponsiveUIService
	) {
		//Register NerdFonts with Angular Material
		iconReg.registerFontClassAlias("nf");
		iconReg.setDefaultFontSetClass("nf");

		this.ui.isMobile$.subscribe((isMobile) => {
			this.isMobile = isMobile;
			if (this.isMobile && this.dialog.openDialogs.length === 0) {
				this.dialog.open(MobileUIWarnComponent, { width: "320px", height: "480px", hasBackdrop: true });
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
			document.querySelector(".mat-sidenav-content")?.scroll(0, 0);
		});

		this.showSuspendedSnackBar();
	}

	ngOnDestroy(): void {}

	showCopiedSnackBar() {
		this._snackBar.open("Copied GPG Key to Clipboard!", "", {
			verticalPosition: "top",
			horizontalPosition: "left",
		});
	}

	showSuspendedSnackBar() {
		//Just check if the suspended date is ahead of today's date
		if (Date.now() < this.suspendedEnd.getTime()) {
			//Give the people a heads up
			this._snackBar.open(
				`Heads Up: I am going to be busy for a while and will be suspending development until ${this.suspendedEnd.toDateString()}`,
				"GOTCHA",
				{ verticalPosition: "top" }
			);
		}
	}
}
