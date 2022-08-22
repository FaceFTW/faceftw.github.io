import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

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

@Injectable({
	providedIn: "root",
})
export class ResponsiveUIService {
	isMobile: boolean = false;
	private isMobileSubject: Subject<boolean> = new Subject();
	isMobile$: Observable<boolean>;

	constructor(private brkpointObs: BreakpointObserver) {
		this.isMobile$ = this.isMobileSubject.asObservable();

		brkpointObs.observe(brokenBrkpts).subscribe((state) => {
			this.isMobile = state.matches;
			this.isMobileSubject.next(this.isMobile);
		});
	}
}
