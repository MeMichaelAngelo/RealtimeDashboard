import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { CreateTaskFormValidationComponent } from '../main-page/create-task-form-validation/create-task-form-validation';
import { strongPasswordRegexpSchema } from '../password-regex/password-regex';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: true,
  imports: [
    CreateTaskFormValidationComponent,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  isFlipped = false;
  loginRegisterForm!: FormGroup;

  ngOnInit() {
    this.loginOrRegisterUser();
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  loginOrRegisterUser(): void {
    this.loginRegisterForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
        ],
      ],
      name: [
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
    });
  }
}
