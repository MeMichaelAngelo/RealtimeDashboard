import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { loginRegisterService } from '../main-service/loginRegister.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(loginRegisterService);
  const router = inject(Router);

  console.log('auth', auth);
  console.log('router', router);

  // TODO:
  // - zrobić guarda i sprawdzić czy działa
  // - zobaczyć jak poprawnie zaimplementować route w podkomponentach (main-page + jego dzieci)

  return true;
};
