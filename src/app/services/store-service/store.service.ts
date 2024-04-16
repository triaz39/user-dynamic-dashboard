import { Injectable } from '@angular/core';
import { CURRENT_USER_REDUCER } from './reducers';
import { USERS_LIST_REDUCER } from './reducers/users-list/usersList';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  REDUCERS = {
    CURRENT_USER: CURRENT_USER_REDUCER,
    USERS_LIST: USERS_LIST_REDUCER
  } as const
  
  getReducer<T extends keyof typeof this.REDUCERS>(reducer: T) {
    return this.REDUCERS[reducer];
  }
}
