import { Component, Input, input, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './create-task-form-validation.html',
  styleUrl: './create-task-form-validation.scss',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class CreateTaskFormValidationComponent {
  control = input.required<AbstractControl>();
}
