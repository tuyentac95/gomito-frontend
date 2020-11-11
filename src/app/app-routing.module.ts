import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainComponent} from './dashboard/components/main/main.component';
import {BoardViewComponent} from './board/board-view/board-view.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardGuard} from './guard/auth-guard.guard';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'change-password', component: ChangePasswordComponent}
    ],
    canActivate: [AuthGuardGuard]
  },
  {path: 'board/:boardId', component: BoardViewComponent, canActivate: [AuthGuardGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuardGuard]},
  {path: 'redirect', redirectTo: 'dashboard' , pathMatch: 'full', canActivate: [AuthGuardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
