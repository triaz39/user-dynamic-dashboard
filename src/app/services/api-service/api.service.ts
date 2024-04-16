import { Injectable } from '@angular/core';
import { usersRoute } from './api-routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  apiRoutes =  {
    USER_ROUTE: new usersRoute(this.http),
  } as const

  get<T extends keyof typeof this.apiRoutes>(route: T) {
    return this.apiRoutes[route];
  }

}
