import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

   onLogin() {
   		this.router.navigate(['dashboard'])
      };

    onGetStudents() {
    	this.authService.getUsers()
   		this.router.navigate(['dashboard'])
      };

}


