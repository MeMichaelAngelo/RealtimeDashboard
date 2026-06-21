import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, retry, throwError } from 'rxjs';
import { SnackbarService } from '../main-service/snackbar.service';
import { getErrorMessage } from '../http-error-codes';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBarService = inject(SnackbarService);

  return next(req).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      snackBarService.displaySnackbar(getErrorMessage(error.status), 'error');

      return throwError(() => error);
    }),
  );
};

// TODO:
// - refactor komponentu logowania - wynieść logowanie i rejestrację do osobnych komponentów, żeby nie mieć jednego wielkiego komponentu logowania i rejestracji
// - dodać rozpoznanie czy użytkownik jest zalogowany (localStorage) + guards
