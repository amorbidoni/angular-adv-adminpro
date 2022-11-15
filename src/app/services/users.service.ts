import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface RootObject {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}

interface Support {
  url: string;
  text: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<RootObject>('https://reqres.in/api/users').pipe(
        take(2),
        map(res=>res.data)
    )
  }

  getInterval(){
    const interval$ = interval(1000)
    return interval$;
  }
}
