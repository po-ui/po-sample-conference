import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavController, ToastController } from '@ionic/angular';

import { UserService } from './../services/user.service';
import { Events } from './../services/events.service';

@Component({
  selector: 'page-user',
  templateUrl: 'login.component.html',
  standalone: false
})
export class LoginComponent {
  constructor(
    public events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private userService: UserService,
    public router: Router
  ) {}

  onLogin(form) {
    this.userService
      .onLogin(form.login, form.password)
      .then(() => {
        this.events.publish('user:login');
        this.router.navigateByUrl('/');
      })
      .catch(() => this.createToast());
  }

  private async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'User or password are incorrect',
      duration: 3000,
      position: 'top',
      cssClass: 'toaster'
    });
    toast.present();
  }
}
