import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  template: `
    <div class="denied-wrap">
      <div class="denied-card">
        <mat-icon class="denied-icon">lock</mat-icon>
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
        <button mat-flat-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon> Go to Dashboard
        </button>
      </div>
    </div>
  `,
  styles: [`
    .denied-wrap {
      display: flex; align-items: center; justify-content: center;
      height: calc(100vh - 64px); background: #F4F6FA;
    }
    .denied-card {
      text-align: center; padding: 48px; background: white;
      border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    .denied-icon { font-size: 64px; width: 64px; height: 64px; color: #E74C3C; margin-bottom: 16px; }
    h2 { font-size: 24px; font-weight: 700; color: #1A202C; margin-bottom: 8px; }
    p  { color: #718096; margin-bottom: 24px; }
  `],
})
export class AccessDeniedComponent {
  constructor(private router: Router) {}
  goBack(): void { this.router.navigate(['/dashboard']); }
}