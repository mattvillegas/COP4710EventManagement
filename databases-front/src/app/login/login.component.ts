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
        const user = data['accountType'];
        this.authService.storeUser(data['uid'])
        if(user === "student")
          this.router.navigate(['/dashboarduser'])
        else if(user === "superadmin")
          this.router.navigate(['/dashboardsuper'])
        else
          this.router.navigate(['/dashboardadmin'])
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


