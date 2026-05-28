import { Component, Input, OnInit } from '@angular/core';
import { RecordService, Record } from '../../../core/services/record.service';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss'],
})
export class RecordsTableComponent implements OnInit {
  @Input() isAdmin = false;

  records: Record[] = [];
  isLoading = false;
  error = '';
  accessLevel = '';
  delayMs = 0;

  // Admin sees more columns
  get displayedColumns(): string[] {
    const base = ['recordId', 'candidateName', 'checkType', 'status', 'priority', 'createdAt'];
    return this.isAdmin
      ? [...base, 'assignedTo', 'internalNotes', 'completedAt']
      : base;
  }

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(delay = 0): void {
    this.isLoading = true;
    this.error = '';
    this.records = [];
    this.delayMs = delay;

    this.recordService.getRecords(delay).subscribe({
      next: (res) => {
        this.records = res.records;
        this.accessLevel = res.accessLevel;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load records';
        this.isLoading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  getPriorityClass(priority: string): string {
    return priority.toLowerCase();
  }
}