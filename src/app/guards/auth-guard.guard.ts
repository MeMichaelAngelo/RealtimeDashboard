import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../main-service/auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isUserLoggedIn().pipe(
    tap((isLogged) => {
      if (!isLogged) {
        router.navigate(['/login-page']);
      }
    }),
    map((isLogged) => isLogged),
  );
};
