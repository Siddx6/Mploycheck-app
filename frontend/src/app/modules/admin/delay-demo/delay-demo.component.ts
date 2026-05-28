import { Component } from '@angular/core';
import { RecordService, Record } from '../../../core/services/record.service';

interface RequestLog {
  id: number;
  delay: number;
  status: 'pending' | 'success' | 'error';
  startTime: number;
  endTime?: number;
  duration?: number;
  records?: number;
}

@Component({
  selector: 'app-delay-demo',
  templateUrl: './delay-demo.component.html',
  styleUrls: ['./delay-demo.component.scss'],
})
export class DelayDemoComponent {
  selectedDelay = 2000;
  delayOptions = [0, 500, 1000, 2000, 3000, 5000];

  isLoading = false;
  records: Record[] = [];
  logs: RequestLog[] = [];
  logCounter = 0;

  elapsed = 0;
  private timer: any = null;

  techPoints = [
    { icon: 'stream',  color: '#FF6B35', title: 'RxJS Observable',    desc: 'HTTP calls return Observables. subscribe() is non-blocking — Angular renders the rest of the page immediately.' },
    { icon: 'timer',   color: '#3498DB', title: '?delay= Parameter',  desc: 'Backend Express middleware reads the delay query param and uses setTimeout before calling next().' },
    { icon: 'tune',    color: '#2ECC71', title: 'Loading Interceptor', desc: 'HTTP_INTERCEPTORS catches every request and notifies LoadingService to show/hide the global progress bar.' },
    { icon: 'layers',  color: '#9B59B6', title: 'Lazy Loading',        desc: 'This Admin module is lazy-loaded — only downloaded when an Admin actually navigates here.' },
  ];

  constructor(private recordService: RecordService) {}

  fetchWithDelay(): void {
    const logId = ++this.logCounter;
    const startTime = Date.now();
    const log: RequestLog = { id: logId, delay: this.selectedDelay, status: 'pending', startTime };
    this.logs.unshift(log);
    this.isLoading = true;
    this.records = [];
    this.elapsed = 0;

    clearInterval(this.timer);
    this.timer = setInterval(() => { this.elapsed += 100; }, 100);

    this.recordService.getRecords(this.selectedDelay).subscribe({
      next: (res) => {
        clearInterval(this.timer);
        const endTime = Date.now();
        log.status = 'success';
        log.endTime = endTime;
        log.duration = endTime - startTime;
        log.records = res.records.length;
        this.records = res.records;
        this.isLoading = false;
      },
      error: () => {
        clearInterval(this.timer);
        const endTime = Date.now();
        log.status = 'error';
        log.endTime = endTime;
        log.duration = endTime - startTime;
        this.isLoading = false;
      },
    });
  }

  clearLogs(): void { this.logs = []; this.records = []; this.elapsed = 0; }

  getProgressWidth(): string {
    if (!this.isLoading || this.selectedDelay === 0) return '99%';
    return `${Math.min((this.elapsed / this.selectedDelay) * 100, 98)}%`;
  }
}