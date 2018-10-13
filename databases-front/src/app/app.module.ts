import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { TestCompComponent } from './test-comp/test-comp.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestCompComponent}
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
    TestCompComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
