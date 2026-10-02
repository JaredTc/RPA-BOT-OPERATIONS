import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TokenService } from '../../../core/services/token.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule,
    NgOptimizedImage],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  protected loginForm!: FormGroup;
  protected errorMessage: string = '';
  protected isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    const credentials = this.loginForm.value;
    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login(credentials)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          // this.status = 'success';
          this.isLoading = false;
          // this.MSG = 'Authentication successful';
          // this.cd.markForCheck();
        },
        error: (err: Error) => {
          // this.status = 'error';
          this.isLoading = false;
          // this.MSG = err.message;
          // this.cd.markForCheck();
        },
      });




      }



  // Helpers para mostrar errores fácilmente en el HTML
 isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
