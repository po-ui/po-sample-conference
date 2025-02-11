import { Component, Input } from "@angular/core";

import * as moment from "moment";

import { Conference } from "./../../model/conference";

@Component({
  selector: "conference-card",
  templateUrl: "./conference-card.component.html",
  styleUrls: ["./conference-card.component.css"],
  standalone: false,
})
export class ConferenceCardComponent {
  @Input("conference") conference: Conference;

  constructor() {}

  getToLocaleDateString() {
    return moment.utc(this.conference.date).format("DD/MM/YYYY");
  }
}
