import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";

const titleFragment = " - Alex Westerman";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "Home - Alex Westerman";
    toolbarTitle: String = "Home";

    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        iconReg: MatIconRegistry,
        private route: ActivatedRoute,
        private titleServ: Title
    ) {
        //Stuff for responsive sidenav
        this.mobileQuery = media.matchMedia("(max-width: 922px)");
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        //Register NerdFonts with Angular Material
        iconReg.registerFontClassAlias("nf");
        iconReg.setDefaultFontSetClass("nf");
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

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
