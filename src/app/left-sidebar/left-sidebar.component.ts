import { CommonModule } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  menuOptions = [
    {
      routeLink: 'profile',
      icon: 'account_circle',
      label: 'Profile',
    },
    {
      routeLink: 'board',
      icon: 'list',
      label: 'Board',
    },
    {
      routeLink: 'settings',
      icon: 'settings',
      label: 'Settings',
    },
    {
      routeLink: 'login',
      icon: 'logout',
      label: 'Logout',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }
}
