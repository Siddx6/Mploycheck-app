import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { RecordService } from '../../../core/services/record.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  loading = true;

  totalUsers = 0;
  activeUsers = 0;
  totalRecords = 0;

  pendingCount = 0;
  inProgressCount = 0;
  completedCount = 0;
  failedCount = 0;

  recentRecords: any[] = [];

  statCards: any[] = [];

  constructor(
    private userService: UserService,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    forkJoin({
      users: this.userService.getAllUsers(),
      records: this.recordService.getRecords(),
    }).subscribe({
      next: ({ users, records }: any) => {
        // Users
        this.totalUsers = users.total;
        this.activeUsers = users.users.filter((u: any) => u.isActive).length;

        // Records
        this.totalRecords = records.total;
        this.pendingCount = records.records.filter((r: any) => r.status === 'Pending').length;
        this.inProgressCount = records.records.filter((r: any) => r.status === 'In Progress').length;
        this.completedCount = records.records.filter((r: any) => r.status === 'Completed').length;
        this.failedCount = records.records.filter((r: any) => r.status === 'Failed').length;

        this.recentRecords = records.records.slice(0, 6);

        this.statCards = [
          { label: 'Total Users', value: this.totalUsers, icon: 'people', color: 'blue' },
          { label: 'Active Users', value: this.activeUsers, icon: 'person_check', color: 'green' },
          { label: 'Total Records', value: this.totalRecords, icon: 'folder_open', color: 'orange' },
          { label: 'Completed', value: this.completedCount, icon: 'task_alt', color: 'teal' },
        ];

        this.loading = false;
      },
      error: () => {
        this.loading = false;
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