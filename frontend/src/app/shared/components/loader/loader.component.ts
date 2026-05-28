import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="loading$ | async">
      <div class="loader-bar"></div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      z-index: 9999;
    }
    .loader-bar {
      height: 3px;
      background: linear-gradient(90deg, #FF6B35, #FF8C5A, #FF6B35);
      background-size: 200% 100%;
      animation: loading 1.4s ease infinite;
    }
    @keyframes loading {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `],
})
export class LoaderComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}