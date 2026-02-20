import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

import { NgClass } from '@angular/common';

import { TaskProgressTypes } from '../../enums/task-progress-types.enum';
import { TaskInterface } from '../../interfaces/task.interface';
import { MainPageDialogComponent } from '../dialog/main-page-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-status-column',
  templateUrl: './task-status-column.component.html',
  styleUrl: './task-status-column.component.scss',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgClass,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TaskStatusColumnComponent {
  TaskProgressTypes = TaskProgressTypes;

  tasks = input.required<TaskInterface[]>();
  status = input.required<TaskProgressTypes>();

  constructor(private dialog: MatDialog) {}

  openDialog(task: TaskInterface): void {
    const dialogRef = this.dialog.open(MainPageDialogComponent, {
      width: '80%',
      height: '60%',
      data: task,
      panelClass: 'main-page-dialog-panel',
    });
  }
}
