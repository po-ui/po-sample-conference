import { Component, OnInit, Input } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {

  @Input() lectures = [];

  @Input() currentUser;

  @Input() segment = 'all';

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController) { }

  ngOnInit() {}

  getColorTrack(color) {
    return { 'border-left': `2px solid ${color}` };
  }

  addFavorite(slidingItem, lecture) {
    this.userService.addFavoriteLectureList(lecture.id).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => slidingItem.close()
        }]
      });
      await alert.present();

    }).catch(() => this.removeFavorite(slidingItem, lecture.id, lecture.title));

  }

  async removeFavorite(slidingItem, lectureId: any, header: string) {
    const alert = await this.alertCtrl.create({
      header,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        { text: 'Cancel', handler: () => slidingItem.close() },
        {
          text: 'Remove',
          handler: () => {
            this.userService.removeFavoriteLecture(lectureId).then(() => {
              this.removeFavoriteFromLectures(lectureId);

              slidingItem.close();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  private removeFavoriteFromLectures(removedLectureId) {
    if (this.segment === 'favorites') {
      this.lectures = this.lectures.filter(lecture => lecture.id !== removedLectureId);
    }
  }

}
