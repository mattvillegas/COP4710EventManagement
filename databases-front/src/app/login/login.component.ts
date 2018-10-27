import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

   onLogin() {
    const user = {
       email : this.email,
       password : this.password
      };

   	this.authService.loginUser(user).subscribe( data => {
      if (data == "Student not found") {
        alert('Account not found, please try again');
        this.router.navigate(['/login']);
      }
      else {
        const user = data['user'];
        //this.authService.storeUser(user)
        this.router.navigate(['/dashboard'])// TO DO success
      }

      }

      );
     } //onLogin

    onGetStudents() {
    	this.authService.getUsers().subscribe(result => {
        console.log(result);

      });
   		this.router.navigate(['dashboard'])
      };

}


