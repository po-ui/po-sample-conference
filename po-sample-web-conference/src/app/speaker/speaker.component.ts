import { Component, OnInit } from "@angular/core";

import { PoPageAction, PoPageFilter } from "@po-ui/ng-components";

import { SpeakerService } from "./speaker.service";
import { Speaker } from "../model/speaker";

@Component({
  selector: "app-speaker",
  templateUrl: "./speaker.component.html",
  styleUrls: ["./speaker.component.css"],
  standalone: false,
})
export class SpeakerComponent implements OnInit {
  actions: Array<PoPageAction> = [
    { label: "Create", url: "home/speakers/create" },
  ];
  filter: PoPageFilter = {
    action: this.filterSpeakersByName.bind(this),
    placeholder: "Name",
  };
  speakers: Array<Speaker>;
  speakerName: string;
  filteredSpeakers: Array<Speaker> = [];

  constructor(private speakerService: SpeakerService) {}

  ngOnInit() {
    this.getSpeakers();
  }

  filterSpeakersByName(speakerName: string) {
    if (speakerName) {
      this.filteredSpeakers = this.speakers.filter((speaker) =>
        speaker.name.toLowerCase().includes(speakerName.toLocaleLowerCase())
      );
    } else {
      this.getSpeakers();
    }
  }

  getSpeakers() {
    this.speakerService.get().subscribe((speakers) => {
      this.speakers = speakers.items.filter(
        (speaker) => speaker.deleted === false
      );
      this.filteredSpeakers = [...this.speakers];
    });
  }
}
