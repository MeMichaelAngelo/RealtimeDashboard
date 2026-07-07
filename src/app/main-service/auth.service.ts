import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  isUserLoggedIn(): Observable<boolean> {
    debugger;
    return this.http
      .get<any>(`${this.api}/isMyTokenActive`, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
