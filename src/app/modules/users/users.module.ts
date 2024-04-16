import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatTableModule } from "@angular/material/table"
@NgModule({
  declarations: [
    UsersListComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatPaginatorModule,
    MatTableModule,
  ]
})
export class UsersModule { }
