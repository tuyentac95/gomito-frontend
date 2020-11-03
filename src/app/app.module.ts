import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from './shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainComponent } from './dashboard/components/main/main.component';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
