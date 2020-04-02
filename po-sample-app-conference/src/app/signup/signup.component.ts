import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';

import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoSyncService } from '@po-ui/ng-sync';

import { UserService } from './../services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.component.html'
})
export class SignupComponent {

  customLiterals: PoPageLoginLiterals = {
    submitLabel: 'Create account'
  };

  customRequestId;

  constructor(
    public navCtrl: NavController,
    private poStorage: PoStorageService,
    private poSync: PoSyncService,
    private userService: UserService) {
    this.httpCommandEvents();
  }

  onSignup(form: PoPageLogin) {
    const newUser = { username: form.login, password: form.password };
    this.customRequestId = newUser.username;

    this.userService.createUser(newUser);
    // this.navCtrl.push(TabsPage);
  }

  private httpCommandEvents() {
    // this.poSync.getResponses().subscribe(poSyncResponse => {

    //   if (poSyncResponse.customRequestId === this.customRequestId) {
    //     const userId = poSyncResponse.response['body'].id;

    //     this.poStorage.set('login', { userId }).then(() => {
    //       this.events.publish('user:login');
    //       this.navCtrl.push(TabsPage);
    //     });

    //   }
    // });
  }

}
