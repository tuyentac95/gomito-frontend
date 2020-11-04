import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainComponent} from './dashboard/components/main/main.component';
import {BoardViewComponent} from './board/board-view/board-view.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent,
    children: [{
    path: '', component: MainComponent
    }]
  },
  {path: 'board/1', component: BoardViewComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
