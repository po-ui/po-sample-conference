import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

import { PoStorageService } from '@po-ui/ng-storage';

import { PageInterface } from './app-page.interface';
import { Events } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  notePage = { title: 'Notes', url: '/notes', icon: 'list-outline' };

  appPages: Array<PageInterface> = [
    {
      title: 'Gallery',
      url: '/gallery',
      icon: 'camera'
    },
    {
      title: 'Schedule',
      url: '/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/speakers',
      icon: 'people'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  loggedOutPages: Array<PageInterface> = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Signup',
      url: '/signup',
      icon: 'person-add'
    }
  ];

  loggedIn: boolean;
  syncPrepared;

  @ViewChild(NavController) nav: NavController;

  constructor(
    public platform: Platform,
    private router: Router,
    private poStorage: PoStorageService,
    private events: Events
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.isLogged();
  }

  logout() {
    this.poStorage.remove('login').then(() => {
      this.events.publish('user:logout');
    });
  }

  async initializeApp() {
    await this.platform.ready();
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: true });
    }

    this.events.get().subscribe(event => {
      this.listenForLoginEvents(event);
    });
  }

  listenForLoginEvents(event: string) {
    if (event === 'user:login' || event === 'user:signup') {
      this.updateLoggedInStatus(true);
    } else if (event === 'user:logout') {
      this.updateLoggedInStatus(false);

      this.router.navigate(['/schedule']);
    }
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  private isLogged() {
    return this.poStorage.get('login').then(loggedIn => this.updateLoggedInStatus(loggedIn));
  }
}
