import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistersuperComponent } from './registersuper/registersuper.component';
import { DashboardsuperComponent } from './dashboardsuper/dashboardsuper.component';
import { DashboarduserComponent } from './dashboarduser/dashboarduser.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardsuper', component: DashboardsuperComponent },
  { path: 'dashboardadmin', component: DashboardadminComponent },
  { path: 'dashboarduser', component: DashboarduserComponent },
  { path: 'registersuper', component: RegistersuperComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RegistersuperComponent,
    DashboardsuperComponent,
    DashboarduserComponent,
    DashboardadminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
