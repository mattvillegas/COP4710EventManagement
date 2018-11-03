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
import { RegisteradminComponent } from './registeradmin/registeradmin.component';

import { AuthenticationService } from './_services/authentication.service';
import { FilterPipe } from './_services/filter.pipe';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardsuper', component: DashboardsuperComponent },
  { path: 'dashboardadmin', component: DashboardadminComponent },
  { path: 'dashboarduser', component: DashboarduserComponent },
  { path: 'registersuper', component: RegistersuperComponent },
  { path: 'registeradmin', component: RegisteradminComponent }
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
    DashboardadminComponent,
    RegisteradminComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
