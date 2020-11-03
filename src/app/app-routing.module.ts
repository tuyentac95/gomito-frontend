import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainComponent} from './dashboard/components/main/main.component';
import {BoardViewComponent} from './board/board-view/board-view.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent,
    children: [{
    path: '', component: MainComponent
    }]
  },
  {path: 'board/1', component: BoardViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
