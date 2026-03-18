import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', Validators.minLength(3)),
    email: new FormControl('', [Validators.email, Validators.required]),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
password: new FormControl('', [
  Validators.required,
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)
]), 
   rePassword: new FormControl('', Validators.required)
  }, { validators: this.handleConfirmPassword });

  msgError: string = '';
  loading: boolean = false;

  onSubmit(): void {
    if (this.registerForm.valid) {
this.loading = true;

      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.success) {
            console.log(res);

            this.router.navigate(['/login']);
            
          }


        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.loading = false;
        },complete: () => {
          this.loading = false;
        }
      })

    } else {
      this.registerForm.markAllAsTouched();
    }

  }

  handleConfirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
  showPassword(pass: HTMLInputElement) {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
}
}