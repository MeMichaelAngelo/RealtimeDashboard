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
import { ProjectInterface } from '../interfaces/project.interface';
import { ProjectProgressTypes } from '../enums/project-progress-types.enum';

import { MatDialog } from '@angular/material/dialog';
import { MainPageDialogComponent } from './dialog/main-page-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  providers: [MainService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush, <--- psuje to pętlę @for
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  projects: ProjectInterface[] = [];
  progressTypes = Object.values(ProjectProgressTypes);
  ProjectProgressTypes = ProjectProgressTypes;
  readonly statuses = Object.values(ProjectProgressTypes); //Przydatne dla @for HTML
  projectsByStatus: Record<ProjectProgressTypes, ProjectInterface[]> = {
    [ProjectProgressTypes.FREE]: [],
    [ProjectProgressTypes.ACTIVE]: [],
    [ProjectProgressTypes.PAUSED]: [],
    [ProjectProgressTypes.DONE]: [],
  };

  constructor(
    private service: MainService,
    private socket: SocketService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.service.getProjects().subscribe((projects) => {
      for (const project of projects) {
        this.projectsByStatus[project.status].push(project);
      }
    });

    // setTimeout(() => {
    //   debugger;
    // }, 3000);

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
