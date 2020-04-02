import { Component } from '@angular/core';

import { NavController, ToastController } from '@ionic/angular';

import { PoPageLogin } from '@po-ui/ng-templates';

import { SignupComponent } from '../signup/signup.component';
import { TabsComponent } from '../tabs/tabs.component';
import { UserService } from './../services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    // public events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private userService: UserService,
  ) { }

  onLogin(form: PoPageLogin) {
    // this.userService.onLogin(form.login, form.password)
    //   .then(() => {
    //     this.events.publish('user:login');
    //     this.navCtrl.push(TabsPage);
    //   })
    //   .catch(() => this.createToast());

  }

  onSignup() {
    // this.navCtrl.push(SignupPage);
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
