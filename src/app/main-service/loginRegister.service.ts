import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

export interface LoginRequest {
  emailOrNickname: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: Omit<User, 'password'>;
}

@Injectable({ providedIn: 'root' })
export class loginRegisterService {
  private api = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  registerUser(newUser: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, newUser);
  }

  loginUser(user: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, user, {
      withCredentials: true,
    });
  }
}
