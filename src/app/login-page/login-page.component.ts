import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { CreateTaskFormValidationComponent } from '../main-page/create-task-form-validation/create-task-form-validation';
import {
  strongPasswordRegexpSchema,
  emailRegexpSchema,
} from '../regexes-list/regexes';
import { loginRegisterService } from '../main-service/loginRegister.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../main-service/snackbar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [
    CreateTaskFormValidationComponent,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginRegisterService: loginRegisterService,
  ) {}

  private snackBarService = inject(SnackbarService);

  isFlipped = signal(false);
  hide = signal(true);
  loginMode = signal<'email' | 'nickname'>('email');
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  readonly isSubmitting = signal(false);

  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
  }

  flipCard(): void {
    this.isFlipped.set(!this.isFlipped());
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({
          ...confirmPassword.errors,
          passwordMismatch: true,
        });
      } else {
        if (confirmPassword.hasError('passwordMismatch')) {
          debugger;
          const errors = { ...confirmPassword.errors };

          delete errors['passwordMismatch'];

          confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
        }
      }

      return null;
    };
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        emailOrNickname: ['', [Validators.required]],
        password: ['', [Validators.required]],
      },
      { updateOn: 'blur' },
    );
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.pattern(emailRegexpSchema)],
        ],
        nickname: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(strongPasswordRegexpSchema),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(strongPasswordRegexpSchema),
          ],
        ],
      },
      { validators: this.passwordMatchValidator(), updateOn: 'blur' },
    );
  }

  registerUser(): void {
    if (!this.registerForm.valid || this.isSubmitting()) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { confirmPassword, ...registerData } =
      this.registerForm.getRawValue();

    this.loginRegisterService.registerUser(registerData).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.snackBarService.displaySnackbar(
          'User registered successfully!',
          'success',
        );
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.isSubmitting.set(false);
        this.snackBarService.displaySnackbar(
          'Error registering user. User already exists.',
          'error',
        );
      },
    });
  }

  logInUser(): void {
    if (!this.loginForm.valid || this.isSubmitting()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.loginRegisterService
      .loginUser(this.loginForm.getRawValue())
      .subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.snackBarService.displaySnackbar('Login successful!', 'success');
          //Zebrać z response token i zapisać go w localStorage (trzeba go użyć do guardów)
        },
        error: (error) => {
          console.error('Error logging in user:', error);
          this.isSubmitting.set(false);
          this.snackBarService.displaySnackbar(
            'Login failed. Please try again.',
            'error',
          );
        },
      });
  }
}
