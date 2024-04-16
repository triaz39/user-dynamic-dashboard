import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "../../components/users-list/users-list.component";
import { UserInfoComponent } from "../../components/user-info/user-info.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'user-info/:userId',
    component: UserInfoComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {};