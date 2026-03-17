import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';

import { MainService } from '../main-service/main.service';
import { TaskInterface } from '../interfaces/task.interface';
import { TaskProgressTypes } from '../enums/task-progress-types.enum';

import { TaskStatusColumnComponent } from './task-status-column/task-status-column.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    TaskStatusColumnComponent,
  ],
  providers: [MainService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  progressTypes = Object.values(TaskProgressTypes);
  TaskProgressTypes = TaskProgressTypes;
  statuses = Object.values(TaskProgressTypes);

  tasks = signal<TaskInterface[]>([]);
  tasksByStatus = computed(() => {
    const result: Record<TaskProgressTypes, TaskInterface[]> = {
      [TaskProgressTypes.FREE]: [],
      [TaskProgressTypes.ACTIVE]: [],
      [TaskProgressTypes.PAUSED]: [],
      [TaskProgressTypes.DONE]: [],
    };

    for (const task of this.tasks()) {
      result[task?.status] = [...result[task?.status], task];
    }

    return result;
  });

  constructor(
    private service: MainService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.fetchAllTasks();
  }

  fetchAllTasks(): void {
    this.service.getAllTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  openCreateNewTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      height: '80%',
      width: '80%',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchAllTasks();
      }
    });
  }
}
