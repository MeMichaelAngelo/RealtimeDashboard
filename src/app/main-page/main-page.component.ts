import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MainService } from '../main-service/main.service';
import { SocketService } from '../../socket.service';
import { TaskInterface } from '../interfaces/task.interface';
import { TaskProgressTypes } from '../enums/task-progress-types.enum';

import { MatDialog } from '@angular/material/dialog';
import { MainPageDialogComponent } from './dialog/main-page-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [MainService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush, <--- psuje to pętlę @for
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  tasks: TaskInterface[] = [];
  progressTypes = Object.values(TaskProgressTypes);
  TaskProgressTypes = TaskProgressTypes;
  readonly statuses = Object.values(TaskProgressTypes);
  tasksByStatus: Record<TaskProgressTypes, TaskInterface[]> = {
    [TaskProgressTypes.FREE]: [],
    [TaskProgressTypes.ACTIVE]: [],
    [TaskProgressTypes.PAUSED]: [],
    [TaskProgressTypes.DONE]: [],
  };

  constructor(
    private service: MainService,
    private socket: SocketService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.fetchAllTasks();
  }

  fetchAllTasks(): void {
    this.service.getAllTasks().subscribe((tasksList) => {
      for (const task of tasksList) {
        this.tasksByStatus[task.status].push(task);
      }
    });
  }

  openDialog(task: TaskInterface): void {
    const dialogRef = this.dialog.open(MainPageDialogComponent, {
      width: '80%',
      height: '60%',
      data: task,
      panelClass: 'main-page-dialog-panel',
    });
  }
}
