import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoStorageService } from '@po-ui/ng-storage';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'PO Conference App';

  menus: Array<PoMenuItem> = [
    { label: 'Home', icon: 'po-icon-home', link: './home' },
    { label: 'Speakers', icon: 'po-icon-user', link: './speakers' },
    { label: 'Lectures', icon: 'po-icon-message', link: './lectures' },
    { label: 'Tracks', icon: 'po-icon-stock', link: './tracks' },
    { label: 'About', icon: 'po-icon-help', link: './conferences' },
    { label: 'Logout', icon: 'po-icon-exit', action: this.logout.bind(this) }
  ];

  constructor(private router: Router, private storage: PoStorageService) { }

  logout(): void {
    this.storage.remove('isLoggedIn').then(() => {
      this.router.navigate(['/login']);
    });
  }

}
