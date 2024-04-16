import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { IUserData } from "../../../../models/user-data.model";

interface IUsersResp {
  data: IUserData[] | IUserData,
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
}

export class usersRoute {
  private readonly USER_ROUTE = 'https://reqres.in/api/users'
  constructor(private http: HttpClient) {}

  async getUsers({
    id,
    params,
  }: {
    id?: string;
    params?: {
      //more query params can be added here
      page: number
    }
  }) : Promise<IUsersResp | null> {
    try {
      let queryParams = ''
      if(id) queryParams += `/${id}`
      else if(params) queryParams += `?page=${params.page}`
      return lastValueFrom(this.http.get<IUsersResp>(`${this.USER_ROUTE}${queryParams}`));
    } catch (error) {
      console.error("Error fetching user: ", error);
      return null;
    }
  }
}