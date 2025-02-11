import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { Speaker } from "../../model/speaker";

@Component({
  selector: "speaker-card",
  templateUrl: "./speaker-card.component.html",
  styleUrls: ["./speaker-card.component.css"],
  standalone: false,
})
export class SpeakerCardComponent {
  /** Objeto do tipo Speaker referente a palestrante. */
  @Input("speaker") speaker: Speaker;

  constructor(private router: Router) {}

  detail() {
    this.router.navigate([`home/speakers/detail/${this.speaker.id}`]);
  }

  edit() {
    this.router.navigate([`home/speakers/edit/${this.speaker.id}`]);
  }
}
