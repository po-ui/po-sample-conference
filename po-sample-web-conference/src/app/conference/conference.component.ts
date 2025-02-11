import { Conference } from "./../model/conference";
import { Component, OnInit } from "@angular/core";

import { ConferenceService } from "./conference.service";

@Component({
  selector: "app-conference",
  templateUrl: "./conference.component.html",
  styleUrls: ["./conference.component.css"],
  standalone: false,
})
export class ConferenceComponent implements OnInit {
  conferences: Array<Conference> = [];

  constructor(private conferenceService: ConferenceService) {}

  ngOnInit() {
    this.getConference();
  }

  getConference() {
    this.conferenceService.get().subscribe((poResponse) => {
      this.conferences.push(...poResponse.items);
    });
  }
}
