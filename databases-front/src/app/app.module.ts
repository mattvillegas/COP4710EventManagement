import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-comp/login-comp.component';
import { RegisterComponent } from './register-comp/register-comp.component';

const appRoutes: Routes = [
  { path: 'login-comp', component: LoginComponent },
  { path: 'register-comp', component: RegisterComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
     appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
