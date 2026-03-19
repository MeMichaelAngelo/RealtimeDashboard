import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
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

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskInterface } from '../../interfaces/task.interface';
import { MainService } from '../../main-service/main.service';
import { CreateTaskFormValidationComponent } from '../create-task-form-validation/create-task-form-validation';
import { TaskProgressTypes } from '../../enums/task-progress-types.enum';

@Component({
  selector: 'app-main-page-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CreateTaskFormValidationComponent,
  ],
  templateUrl: './main-page-dialog.component.html',
  styleUrl: './main-page-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainPageDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<MainPageDialogComponent>);
  editMode: boolean = false;
  statuses = Object.values(TaskProgressTypes);

  previewAndEditForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: TaskInterface,
    private service: MainService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loadForm();
    this.editMode;
  }

  loadForm() {
    this.previewAndEditForm = this.fb.group({
      name: [
        this.task.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      status: [this.task.status, [Validators.required]],
      progress: [
        this.task.progress,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      description: [
        this.task.description,
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(1000),
        ],
      ],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  swichToEditMode() {
    this.editMode = true;
  }

  updateForm(): void {
    if (this.previewAndEditForm.invalid) return;
    this.service
      .updateTask(this.task._id!, this.previewAndEditForm.value)
      .subscribe((updatedTask) => {
        this.snackBar.open('Task updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
        });
        this.dialogRef.close(updatedTask);
        this.editMode = false;
      });
  }

  deleteTask(id: string) {
    this.service.deleteTask(id).subscribe(() => {
      this.snackBar.open('Task deleted successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
      });
      this.dialogRef.close(true);
    });
  }
}
