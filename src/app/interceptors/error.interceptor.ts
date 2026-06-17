import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, retry, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log('ERR', error);
      console.log('REQ', req);
      switch (error.status) {
        case 401:
          snackBar.open('Invalid email or password', 'Close', {
            duration: 3000,
          });
          break;
        case 403:
          snackBar.open(
            'You do not have permission to perform this action',
            'Close',
            {
              duration: 3000,
            },
          );
          break;
        case 404:
          snackBar.open('The requested resource was not found', 'Close', {
            duration: 3000,
          });
          break;
        case 500:
          snackBar.open(
            'An error occurred on the server. Please try again later.',
            'Close',
            {
              duration: 3000,
            },
          );
          break;
        default:
          snackBar.open(
            'An unexpected error occurred. Please try again later.',
            'Close',
            {
              duration: 3000,
            },
          );
          break;
      }

      return throwError(() => error);
    }),
  );
};

// TODO:
// - poprawić snackbary
// - zrobić osobną metodę / klasę do obsługi błędów, żeby nie zaśmiecać interceptorów
// - refactor komponentu logowania - wynieść logowanie i rejestrację do osobnych komponentów, żeby nie mieć jednego wielkiego komponentu logowania i rejestracji
