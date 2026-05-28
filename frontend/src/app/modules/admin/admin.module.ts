import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DelayDemoComponent } from './delay-demo/delay-demo.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminOverviewComponent },  
      { path: 'users', component: UserManagementComponent },
      { path: 'delay-demo', component: DelayDemoComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, UserManagementComponent, DelayDemoComponent, AdminOverviewComponent],
  imports: [
    SharedModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTooltipModule, MatProgressSpinnerModule,
  ],
})
export class AdminModule {}