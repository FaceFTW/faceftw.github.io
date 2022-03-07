import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-error404",
	templateUrl: "./error404.component.html",
	styleUrls: ["./error404.component.scss"],
})
export class Error404Component implements OnInit {
	img_src: string;
	constructor() {
		this.img_src = `assets/img/404/err_${Date.now() % 19}.webp`;
	}

	ngOnInit(): void {}
}
