import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PoSelectOption, PoNotificationService } from "@po-ui/ng-components";

import { Speaker } from "./../../model/speaker";
import { SpeakerService } from "../speaker.service";

@Component({
  selector: "speaker-edit",
  templateUrl: "./speaker-edit.component.html",
  styleUrls: ["./speaker-edit.component.css"],
  standalone: false,
})
export class SpeakerEditComponent implements OnInit {
  isUpdate: boolean = false;
  photoOptions: Array<PoSelectOption> = [
    {
      value: "avatar1.png",
      label: "Picture 1",
    },
    {
      value: "avatar2.png",
      label: "Picture 2",
    },
    {
      value: "avatar3.png",
      label: "Picture 3",
    },
    {
      value: "avatar4.png",
      label: "Picture 4",
    },
    {
      value: "avatar5.png",
      label: "Picture 5",
    },
    {
      value: "avatar6.png",
      label: "Picture 6",
    },
    {
      value: "avatar7.png",
      label: "Picture 7",
    },
    {
      value: "avatar8.png",
      label: "Picture 8",
    },
  ];
  title: string = "Create speaker";

  /** Objeto do tipo Speaker referente a palestrante. */
  @Input("speaker") speaker: Speaker = new Speaker();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private speakerService: SpeakerService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getSpeakerById(params["id"].toString());
      }
    });
  }

  cancel() {
    this.navigateToPath("home/speakers");
  }

  create() {
    this.speakerService.post(this.speaker).subscribe(
      (speaker) => {
        this.poNotification.success(
          `Speaker ${speaker.name} created successfully!`
        );
        this.navigateToPath("home/speakers");
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  edit() {
    this.speakerService.put(this.speaker).subscribe(
      (speaker) => {
        this.poNotification.success(
          `Speaker ${speaker.name} updated successfully!`
        );
        this.navigateToPath("home/speakers");
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  getSpeakerById(id: string) {
    this.speakerService.getById(id).subscribe(
      (speaker) => {
        this.speaker = speaker;

        this.title = `Edit speaker ${this.speaker.name}`;
        this.isUpdate = true;
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  save() {
    if (this.isUpdate) {
      this.edit();
    } else {
      this.create();
    }
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
