import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { MainService } from '../../main-service/main.service';

import { TaskProgressTypes } from '../../enums/task-progress-types.enum';
import { CreateTaskFormValidationComponent } from './create-task-form-validation/create-task-form-validation';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CreateTaskFormValidationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateTaskDialogComponent implements OnInit {
  createTaskForm!: FormGroup;
  statuses = Object.values(TaskProgressTypes);

  constructor(
    private fb: FormBuilder,
    public service: MainService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.createTaskForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      status: [TaskProgressTypes.FREE, [Validators.required]],
      progress: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(1000),
        ],
      ],
    });
  }

  onSubmit(): void {
    const filledForm = this.createTaskForm.value;
    if (!filledForm) return;
    this.service.createNewTask(filledForm).subscribe((response) => {
      //Dodać snackbar z info o powodzeniu lub niepowodzeniu przy tworzeniu zadania
      //setinterval na 0.5s z zamknięciem modala
    });
  }
}
