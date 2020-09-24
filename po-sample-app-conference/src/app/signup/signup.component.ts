import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { PoSyncService } from '@po-ui/ng-sync';

import { UserService } from './../services/user.service';
import { Events } from './../services/events.service';

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
    private events: Events,
    private poSync: PoSyncService,
    private userService: UserService,
    private router: Router) {
    this.httpCommandEvents();
  }

  onSignup(form: PoPageLogin) {
    const newUser = { username: form.login, password: form.password };
    this.customRequestId = newUser.username;

    this.userService.createUser(newUser);
  }

  private httpCommandEvents() {
    this.poSync.getResponses().subscribe(poSyncResponse => {

      if (poSyncResponse.customRequestId === this.customRequestId) {
        const key = 'body';
        const user = poSyncResponse.response[key];

        this.poSync.onSync().subscribe(() => this.logIn(user));
      }
    });
  }

  private logIn(user: any) {
    this.userService.logIn(user).then(() => {
      this.events.publish('user:login');
      this.router.navigateByUrl('/schedule');
    });
  }

}
