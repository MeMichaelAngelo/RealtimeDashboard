import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
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
  collapseSidebar = output<boolean>();
  private el = inject(ElementRef);

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

  @HostListener('document:click', ['$event'])
  collapseMenuAfterClick(event: MouseEvent) {
    const mouseClickOnMenu = this.el.nativeElement.contains(event.target);
    console.log(this.el.nativeElement);
    console.log(event.target);
    if (!mouseClickOnMenu && !this.isLeftSidebarCollapsed()) {
      this.collapseSidebar.emit(true);
    }
  }

  toggleCollapse(): void {
    this.collapseSidebar.emit(!this.isLeftSidebarCollapsed());
  }
}
