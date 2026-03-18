import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);


  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
   
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&#^()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/]).{8,}$')]),
   
  });

  msgError: string = '';
  loading: boolean = false;

  onSubmit(): void {
    if (this.loginForm.valid) {
this.loading = true;
this.ngxSpinnerService.show()

      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {

          if (res.success) {
            console.log(res);
            localStorage.setItem('socialToken', res.data.token);
            localStorage.setItem('socialUser', JSON.stringify(res.data.user));


            this.router.navigate(['/feed']);
this.ngxSpinnerService.hide()
            
          }


        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.loading = false;
          this.ngxSpinnerService.hide()

        },complete: () => {
          this.loading = false;
          this.ngxSpinnerService.hide()

        }
      })

    } else {
      this.loginForm.markAllAsTouched();
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
