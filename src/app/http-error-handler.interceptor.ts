import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';

@Injectable()
export class HttpErrorHandler implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),
      catchError((err) => {
        console.error('Error handled by Interceptor:', err);
        return throwError(() => {
          console.log('Error re-thrown by Interceptor:', err);
          return err;
        });
      }),
    );
  }
}
