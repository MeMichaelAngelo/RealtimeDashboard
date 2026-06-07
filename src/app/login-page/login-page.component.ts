import {
  ChangeDetectionStrategy,
  Component,
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
import { strongPasswordRegexpSchema } from '../password-regex/password-regex';
import { loginRegisterService } from '../main-service/loginRegister.service';
import { CommonModule } from '@angular/common';

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

  isFlipped = signal(false);
  hide = signal(true);
  loginRegisterForm!: FormGroup;
  readonly isSubmitting = signal(false);

  ngOnInit() {
    this.loginOrRegisterUserForm();
    this.toggleFormMode();
  }

  flipCard(): void {
    this.isFlipped.set(!this.isFlipped());
    this.toggleFormMode();
  }

  toggleFormMode(): void {
    const { nickname, firstName, lastName, confirmPassword } =
      this.loginRegisterForm.controls;

    const controls = [nickname, firstName, lastName, confirmPassword];

    controls.forEach((control) =>
      this.isFlipped() ? control.enable() : control.disable(),
    );
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

  loginOrRegisterUserForm(): void {
    this.loginRegisterForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
          ],
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
    //interceptor w następnym pushu
    if (!this.loginRegisterForm.valid || this.isSubmitting()) {
      this.loginRegisterForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { confirmPassword, ...registerData } =
      this.loginRegisterForm.getRawValue();

    this.loginRegisterService.registerUser(registerData).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        //dać snackbar z success
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.isSubmitting.set(false);
        //snackbar z errorem
      },
    });
  }
}
