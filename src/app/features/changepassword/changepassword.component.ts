import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChangePasswordService } from './services/change-password.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './changepassword.component.html',
})
export class ChangePasswordComponent implements OnInit {
  private readonly changePasswordService = inject(ChangePasswordService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
      ]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.handleConfirmPassword });
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) return;

    const { password, newPassword } = this.changePasswordForm.value;

    this.errorMsg = '';
    this.successMsg = '';
    this.isLoading = true;

    this.changePasswordService.changePassword(password, newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = 'Password changed successfully!';
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Something went wrong!';
      }
    });
  }

  handleConfirmPassword(group: AbstractControl) {
    const password = group.get('newPassword')?.value;
    const rePassword = group.get('confirmPassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
}