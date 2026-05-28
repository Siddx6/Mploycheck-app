import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMsg = '';
  hidePassword = true;

  roles = ['General User', 'Admin'];

  featureList = [
    { icon: 'verified_user', label: 'Identity Verification' },
    { icon: 'work_history',  label: 'Employment History Checks' },
    { icon: 'school',        label: 'Education Verification' },
    { icon: 'gavel',         label: 'Criminal Record Checks' },
    { icon: 'credit_score',  label: 'Credit & Financial Checks' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
      return;
    }

    this.loginForm = this.fb.group({
      userId:   ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:     ['General User', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMsg = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.redirectByRole();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Login failed. Please try again.';
      },
    });
  }

  private redirectByRole(): void {
    const user = this.authService.getCurrentUser();
    if (user?.role === 'Admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  fillDemo(type: 'admin' | 'user'): void {
    if (type === 'admin') {
      this.loginForm.patchValue({ userId: 'ADM001', password: 'admin123', role: 'Admin' });
    } else {
      this.loginForm.patchValue({ userId: 'USR001', password: 'user123', role: 'General User' });
    }
  }
}
