import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class loginRegisterService {
  private api = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  registerUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.api}/register`, newUser);
  }

  loginUser(user: User) {
    return this.http.post(`${this.api}/login`, user);
  }
}
