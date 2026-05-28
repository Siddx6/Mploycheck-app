import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  currentUser: User | null = null;
  activeRoute = '';

  navItems = [
    { label: 'Overview',        icon: 'dashboard',            path: '/admin' },
    { label: 'User Management', icon: 'manage_accounts',      path: '/admin/users' },
    { label: 'Async / Delay Demo', icon: 'timer',             path: '/admin/delay-demo' },
    { label: 'Dashboard',       icon: 'bar_chart',            path: '/dashboard' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.activeRoute = this.router.url;

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => (this.activeRoute = e.urlAfterRedirects));
  }

  isActive(path: string): boolean {
    return this.activeRoute === path;
  }

  logout(): void {
    this.authService.logout();
  }
}