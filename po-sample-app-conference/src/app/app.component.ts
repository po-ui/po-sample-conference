import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { PoStorageService } from '@po-ui/ng-storage';

import { PageInterface } from './app-page.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  logoutPage: Array<PageInterface> = [
    {
      title: 'Logout',
      url: '/app/tabs',
      icon: 'log-out'
    }
  ];

  notePage: Array<PageInterface> = [
    {
      title: 'Notes',
      url: '/app/note-list',
      icon: 'paper'
    }
  ];

  appPages: Array<PageInterface> = [
    {
      title: 'Schedule',
      url: '/schedule',
      icon: 'calendar'
    },
    // {
    //   title: 'Speakers',
    //   url: '/speakers',
    //   icon: 'people'
    // },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  loggedOutPages: Array<PageInterface> = [
    {
      title: 'Login',
      url: '/app/login',
      icon: 'log-in'
    },
    {
      title: 'Signup',
      url: '/app/signup',
      icon: 'person-add'
    }
  ];

  loggedIn: boolean;
  syncPrepared;

  @ViewChild(NavController) nav: NavController;

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private menu: MenuController,
    private poStorage: PoStorageService,
  ) {
    this.initApp();
  }

  ionViewWillEnter() {
    this.isLogged();
    this.listenForLoginEvents();
  }

  logOut(event) {
    this.poStorage.remove('login').then(() => event.publish('user:logout'));
  }

  private enableMenu(login: boolean) {
    this.menu.enable(!login, 'loggedOutMenu');
    this.menu.enable(login, 'loggedInMenu');
  }

  private initApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  private isLogged() {
    this.poStorage.get('login').then(login => this.updateLoggedInStatus(!!login));
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
      this.enableMenu(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
      this.enableMenu(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
      this.enableMenu(true);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }
}
