import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../components/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  urlUsers: string = 'http://localhost:4000/users';
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.urlUsers);
  }
  postUser(person: IUser) {
    return this.http.post<IUser>(this.urlUsers, person);
  }
}
