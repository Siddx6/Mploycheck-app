import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  error = '';
  successMsg = '';

  // Dialog state
  showDialog = false;
  isEditMode = false;
  editingUserId = '';
  isSaving = false;

  userForm!: FormGroup;
  currentAdminId = '';

  displayedColumns = ['userId', 'name', 'email', 'role', 'department', 'status', 'actions'];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentAdminId = this.authService.getCurrentUser()?.userId || '';
    this.initForm();
    this.loadUsers();
  }

  initForm(user?: any): void {
    this.userForm = this.fb.group({
      userId:     [user?.userId     || '', [Validators.required, Validators.minLength(3)]],
      name:       [user?.name       || '', Validators.required],
      email:      [user?.email      || '', [Validators.required, Validators.email]],
      password:   ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      role:       [user?.role       || 'General User', Validators.required],
      department: [user?.department || '', Validators.required],
      phone:      [user?.phone      || ''],
      isActive:   [user?.isActive !== undefined ? user.isActive : true],
    });

    if (this.isEditMode) {
      this.userForm.get('userId')?.disable();
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (res: { users: User[]; }) => { this.users = res.users; this.isLoading = false; },
      error: (err: { error: { message: string; }; }) => { this.error = err?.error?.message || 'Failed to load users'; this.isLoading = false; },
    });
  }

  openCreate(): void {
    this.isEditMode = false;
    this.editingUserId = '';
    this.showDialog = true;
    this.initForm();
  }

  openEdit(user: User): void {
    this.isEditMode = true;
    this.editingUserId = user.userId;
    this.showDialog = true;
    this.initForm(user);
  }

  closeDialog(): void {
    this.showDialog = false;
    this.userForm.reset();
    this.error = '';
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    this.isSaving = true;
    this.error = '';

    const payload = { ...this.userForm.getRawValue() };
    if (this.isEditMode && !payload.password) delete payload.password;

    const call$ = this.isEditMode
      ? this.userService.updateUser(this.editingUserId, payload)
      : this.userService.createUser(payload);

    call$.subscribe({
      next: (res: { message: string; }) => {
        this.isSaving = false;
        this.successMsg = res.message;
        this.closeDialog();
        this.loadUsers();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err: { error: { message: string; }; }) => {
        this.isSaving = false;
        this.error = err?.error?.message || 'Operation failed';
      },
    });
  }

  deleteUser(userId: string): void {
    if (!confirm(`Delete user ${userId}? This cannot be undone.`)) return;
    this.userService.deleteUser(userId).subscribe({
      next: (res: { message: string; }) => {
        this.successMsg = res.message;
        this.loadUsers();
        setTimeout(() => (this.successMsg = ''), 3000);
      },
      error: (err: { error: { message: string; }; }) => { this.error = err?.error?.message || 'Delete failed'; },
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  }
}