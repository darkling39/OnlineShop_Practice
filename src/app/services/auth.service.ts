import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { IUser } from '../components/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router, private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getTotken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getTotken() !== null;
  }
  logIn(userInfo: {
    email: string;
    password: string;
  }): Observable<string | boolean> {
    if (
      userInfo.email === 'admin@gmail.com' &&
      userInfo.password === 'admin123'
    ) {
      this.setToken('fkldsfsasdfasdf');
      return of(true);
    }
    return throwError(() => new Error('Failed LogIn'));
  }
  register(userInfo: IUser) {}

  logout() {
    this.route.navigate(['login']);
    localStorage.removeItem('token');
  }
}
