import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { PoStorageService } from "@po-ui/ng-storage";

import { PoMenuItem } from "@po-ui/ng-components";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false,
})
export class HomeComponent {
  title = "PO Conference App";

  menus: Array<PoMenuItem> = [
    { label: "Home", icon: "an an-house-line", link: "./home" },
    { label: "Speakers", icon: "an an-user", link: "./speakers" },
    { label: "Lectures", icon: "an an-chat", link: "./lectures" },
    { label: "Tracks", icon: "an an-package", link: "./tracks" },
    { label: "About", icon: "an an-question", link: "./conferences" },
    { label: "Logout", icon: "an an-sign-out", action: this.logout.bind(this) },
  ];

  constructor(private router: Router, private storage: PoStorageService) {}

  logout(): void {
    this.storage.remove("isLoggedIn").then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
