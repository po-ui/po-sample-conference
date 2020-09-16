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
    { label: 'Home', icon: 'home', link: './home' },
    { label: 'Speakers', icon: 'user', link: './speakers' },
    { label: 'Lectures', icon: 'message', link: './lectures' },
    { label: 'Tracks', icon: 'stock', link: './tracks' },
    { label: 'About', icon: 'help', link: './conferences' },
    { label: 'Logout', icon: 'exit', action: this.logout.bind(this) }
  ];

  constructor(private router: Router, private storage: PoStorageService) { }

  logout(): void {
    this.storage.remove('isLoggedIn').then(() => {
      this.router.navigate(['/login']);
    });
  }

}
