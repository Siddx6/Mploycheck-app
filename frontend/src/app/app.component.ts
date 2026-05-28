import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({ selector: "app-root", templateUrl: "./app.component.html", styleUrls: ["./app.component.scss"] })
export class AppComponent implements OnInit {
  showNavbar = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.showNavbar = !e.urlAfterRedirects.includes("/auth/");
    });
  }
}
