import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  university: String;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onStudentRegister(){
  	const student = { 
  		name : this.name,
  		email : this.email,
  		password : this.password,
  		university : this.university
  	};

  	this.authService.registerStudent(student).subscribe( 
  	  data => {
  	    //alert('You are registered as a student and can now log in');
        this.router.navigate(['/login']); 
      }, error => {
        //alert('Couldn't create student account, please try again');
        this.router.navigate(['/register']);
      });
     } 
  }
