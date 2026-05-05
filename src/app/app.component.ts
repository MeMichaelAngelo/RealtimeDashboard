import { Component, signal } from '@angular/core';

import { MainPageComponent } from './main-page/main-page.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginPageComponent, CommonModule], //przywrócić usunięte komponenty pod koniec
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLeftSidebarCollapsed = signal<boolean>(true);

  expandOrCollapseSidebar(isLeftSidebarCollapsed: boolean): void {
    return this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
