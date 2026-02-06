import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectInterface } from '../../interfaces/project.interface';

@Component({
  selector: 'app-main-page-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page-dialog.component.html',
  styleUrl: './main-page-dialog.component.scss',
})
export class MainPageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ProjectInterface) {}
}
