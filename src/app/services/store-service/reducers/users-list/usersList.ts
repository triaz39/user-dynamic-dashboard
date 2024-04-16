import { BehaviorSubject } from "rxjs";
import { IUserData } from "../../../../models/user-data.model";

const USERS_LIST_INITIAL_VALUE: IUserData[] = [];

const USERS_LIST = new BehaviorSubject<IUserData[]>(USERS_LIST_INITIAL_VALUE);

export const USERS_LIST_REDUCER = {
  subscribe: (callback: (userList: any) => void) => USERS_LIST.subscribe(callback),
  get: () => USERS_LIST.getValue(),
  set: (data: IUserData[]) => {
    const usersList = USERS_LIST.getValue();
    const dataToPush: IUserData[] = []
    data.forEach((userData) => {
      const { id } = userData;
      const userIncluded = usersList.find(({id: userId}) => userId === id);
      if (!userIncluded) {
        dataToPush.push(userData);
      }
    })
    const resultArray = [...usersList, ...dataToPush];
    resultArray.sort((a, b) => a.id - b.id )
    if (dataToPush.length) USERS_LIST.next(resultArray);
  }

}