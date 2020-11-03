import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainComponent} from './dashboard/components/main/main.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent,
    children: [{
    path: '', component: MainComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
