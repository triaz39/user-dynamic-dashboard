import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { StoreService } from '../../services/store-service/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IUserData } from '../../models/user-data.model';
import { timeStamp } from 'console';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  totalPages = 1;
  currentPage = 1;
  pageLength = 0;
  retrievedPages: number[] = [];
  displayedColumns = ['id', 'name'];
  dataSource: any[] = [];
  searchString = ''
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router,
  ) { }

  async ngAfterViewInit() {
    await this.fetchUsers(this.currentPage);
    this.subscribeToData();
  }

  subscribeToData() {
    this.storeService.getReducer('USERS_LIST').subscribe((userList) => {
      this.handleDataSource(userList)
    })
  }

  async fetchUsers(page: number) {
    const resp = await this.apiService
      .get('USER_ROUTE')
      .getUsers({
        params: {
          page,
        }
      })

      console.log("resp: ", resp)
    
    if(!resp) return;
    this.storeService.getReducer('USERS_LIST').set(resp.data as IUserData[]);

    const { page: retrievedPage, total_pages, per_page } = resp;
    this.handlePages({
      totalPages: total_pages,
      pageLength: per_page,
      retrievedPage,
    })
  }

  handleDataSource(userList: any[]) {
    this.dataSource = userList.slice((this.currentPage - 1) * this.pageLength, this.currentPage * this.pageLength)
  }

  handlePages({
    totalPages,
    retrievedPage,
    pageLength
  }: {
    totalPages?: number;
    retrievedPage: number;
    pageLength?: number;
  }) {
    if(totalPages && this.totalPages !== totalPages) this.totalPages = totalPages;
    if(pageLength && this.pageLength !== pageLength) this.pageLength = pageLength;
    if(!this.retrievedPages.includes(retrievedPage)) this.retrievedPages.push(retrievedPage);
  }

  handlePageChange(page: {
    pageIndex: number,
  }) {
    const {pageIndex} = page
    this.currentPage = pageIndex + 1;
    this.handleDataSource(this.storeService.getReducer('USERS_LIST').get());
    //it is to be noted here that pageIndex is one less than the currentPage
    if(this.retrievedPages.includes(this.currentPage)) return;
    this.fetchUsers(this.currentPage);

  }

  async handleRowClick(userId: any) {
    this.storeService.getReducer('CURRENT_USER').set(userId);
    this.router.navigate([`/user-info/${userId}`])
  }

  async handleSearch(event: any) {
    const searchString = event.target.value;
    console.log("event: ", searchString)
    this.searchString = searchString;
    const userList = this.storeService.getReducer('USERS_LIST').get();
    if(searchString.length) {
      const numberRegex = /^[0-9]+$/;
      if(!numberRegex.test(searchString)) {
        window.alert("not a number")
        return;
      }
      const userInfo = userList.find(({id}) => Number(searchString) === id);
      console.log("userInfo: ", userInfo)
      if(userInfo) {
        this.dataSource = [userInfo]
        return;
      }
      const userDataResp = await this.apiService.get('USER_ROUTE').getUsers({
        id: searchString,
      })
      if(!userDataResp) return;
      this.storeService.getReducer('USERS_LIST').set([userDataResp?.data as IUserData]);
      this.dataSource = [userDataResp.data]
    } else {
      this.handleDataSource(userList);
    }

  }
}
