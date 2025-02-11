import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { PoNotificationService, PoDialogService } from "@po-ui/ng-components";

import { Lecture } from "./../../model/lecture";
import { LectureService } from "../lecture.service";

@Component({
  selector: "app-lecture-detail",
  templateUrl: "./lecture-detail.component.html",
  styleUrls: ["./lecture-detail.component.css"],
  standalone: false,
})
export class LectureDetailComponent implements OnInit {
  lecture: Lecture = new Lecture();
  title: string;

  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private router: Router,
    private poAlert: PoDialogService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getLectureById(params["id"].toString());
      }
    });
  }

  back() {
    window.history.back();
  }

  edit() {
    this.navigateToPath(`home/lectures/edit/${this.lecture.id}`);
  }

  getLectureById(id: string) {
    this.lectureService.getById(id).subscribe(
      (lecture) => {
        this.lecture = lecture;
        this.title = `Lecture ${this.lecture.title} detail`;
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  remove() {
    this.poAlert.confirm({
      title: "Do you want to delete this lecture?",
      message: `Are you sure you want to delete the ${this.lecture.title} lecture?`,
      confirm: () => {
        this.lectureService.delete(this.lecture.id).subscribe(
          (lectureId) => {
            this.poNotification.success(`Lecture deleted successfully!`);
            this.navigateToPath("home/lectures");
          },
          (error) => {
            this.poNotification.error(error.status + " " + error.statusText);
          }
        );
      },
      cancel: undefined,
    });
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
