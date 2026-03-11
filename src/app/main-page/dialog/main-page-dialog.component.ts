import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TaskInterface } from '../../interfaces/task.interface';
import { MainService } from '../../main-service/main.service';

@Component({
  selector: 'app-main-page-dialog',
  standalone: true,
  imports: [CommonModule, MatDividerModule, FormsModule, MatProgressBarModule],
  templateUrl: './main-page-dialog.component.html',
  styleUrl: './main-page-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainPageDialogComponent {
  private dialogRef = inject(MatDialogRef<MainPageDialogComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public task: TaskInterface,
    private service: MainService,
  ) {}

  test(): void {
    // TODO
    console.log(this.task);
  }

  deleteTask(id: string) {
    this.service.deleteTask(id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
