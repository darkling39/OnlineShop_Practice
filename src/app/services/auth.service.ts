import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map, of, throwError } from 'rxjs';
import { IUser } from '../components/models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router, private userService: UserService) {}
  users: IUser[] = [];
  userSubscription: Subscription;

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getTotken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getTotken() !== null;
  }

  logIn(userInfo: IUser) {
    this.userSubscription = this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.users.map((item) => {
        if (
          item.email === userInfo.email &&
          item.password === userInfo.password
        ) {
          this.setToken(item.token);
          this.route.navigate(['house/h-home']);
        }
      });
    });
  }
  register(userInfo: IUser) {
    userInfo.token = this.makeRandom();
    this.userService.postUser(userInfo).subscribe((data) => {
      this.users.push(data);
    });
  }
  makeRandom() {
    const possible: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]=-)(*&^%$#@!~`";
    let text: string = '';
    for (let i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  logout() {
    this.route.navigate(['login']);
    localStorage.removeItem('token');
  }
}
