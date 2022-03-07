import { Component, OnInit } from "@angular/core";
import aboutData from "src/assets/json/about.json";

@Component({
	selector: "app-about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
	header: string = aboutData.header;
	paragraphs: string[] = aboutData.paragraphs;
	image: string = "assets/img/" + aboutData.image;

	constructor() {}

	ngOnInit(): void {}
}
