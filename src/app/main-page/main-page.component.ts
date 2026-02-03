import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MainService } from '../main-service/main.service';
import { SocketService } from '../../socket.service';
import { CommonModule } from '@angular/common';
import { ProjectInterface } from '../interfaces/project.interface';
import { MatCardModule } from '@angular/material/card';
import { ProjectProgressTypes } from '../enums/project-progress-types.enum';

import { MatDialog } from '@angular/material/dialog';
import { MainPageDialogComponent } from './dialog/main-page-dialog.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  providers: [MainService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush, <--- psuje to pętlę @for
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  projects: ProjectInterface[] = [];
  progressTypes = Object.values(ProjectProgressTypes);
  freeProjects: ProjectInterface[] = [];
  activeProjects: ProjectInterface[] = [];
  pausedProjects: ProjectInterface[] = [];
  doneProjects: ProjectInterface[] = [];

  constructor(
    private service: MainService,
    private socket: SocketService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.service.getProjects().subscribe((data) => {
      this.freeProjects = data.filter(
        (p) => p.status === ProjectProgressTypes.FREE,
      );
      this.activeProjects = data.filter(
        (p) => p.status === ProjectProgressTypes.ACTIVE,
      );
      this.pausedProjects = data.filter(
        (p) => p.status === ProjectProgressTypes.PAUSED,
      );
      this.doneProjects = data.filter(
        (p) => p.status === ProjectProgressTypes.DONE,
      );
    });

    // this.socket.onProjectUpdated().subscribe((updated) => {
    //   console.log(updated);
    //   const index = this.projects.findIndex((p) => p._id === updated._id);

    //   if (index !== -1) {
    //     this.projects[index] = updated;
    //   }
    // });
  }

  openDialog(project: ProjectInterface): void {
    const dialogRef = this.dialog.open(MainPageDialogComponent, {
      width: '80%',
      height: '60%',
      data: project,
    });
  }
}
