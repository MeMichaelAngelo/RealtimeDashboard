import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard } from './guards/auth-guard.guard';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [authGuard],
  },
];
