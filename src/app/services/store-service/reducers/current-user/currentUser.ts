import { BehaviorSubject } from "rxjs"

const CURRENT_USER_INITIAL_VALUE = ''

const CURRENT_USER = new BehaviorSubject<string>(CURRENT_USER_INITIAL_VALUE);

export const CURRENT_USER_REDUCER = {
  subscribe: CURRENT_USER.subscribe,
  get: CURRENT_USER.getValue(),
  set: (id: string) => CURRENT_USER.next(id),
}