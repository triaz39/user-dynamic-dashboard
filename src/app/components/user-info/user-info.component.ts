import { Component } from '@angular/core';
import { StoreService } from '../../services/store-service/store.service';
import { ApiService } from '../../services/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserData } from '../../models/user-data.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  userId: number | null = null;
  userInfo!: IUserData
  constructor(
    private storeService: StoreService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  
  ngOnInit() {
    this.getUserIdFromRoute();
  }

  getUserIdFromRoute() {
    this.route.params.subscribe(async ({userId}) => {
      this.userId = userId;
      await this.handleUserId();
    })
  }

  async handleUserId() {
    const userList = this.storeService.getReducer('USERS_LIST').get();
    const user = userList.find(({id}) => this.userId === id);
    if(user) {
      this.userInfo = user;
      return;
    }
    const userInfo = await this.apiService.get('USER_ROUTE').getUsers({
      id: String(this.userId),
    })

    if(!userInfo) return;
    this.userInfo = userInfo.data as IUserData;
    this.storeService.getReducer('USERS_LIST').set([userInfo.data as IUserData]);
  }

  backToUserList() {
    this.router.navigate([''])
  }

}
