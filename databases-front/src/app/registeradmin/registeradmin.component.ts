import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  university: String;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onAdminRegister(){
  	const admin = { 
  		name: this.name,
  		email: this.email,
  		password : this.password,
  		university : this.university
  	};

  this.authService.registerAdmin(admin).subscribe( 
  	  data => {
        //alert('You are registered as an admin and can now log in');
        this.router.navigate(['/login']); 
      }, error => {
        //alert('Couldn't create super admin account, please try again');
        this.router.navigate(['/registeradmin']);
      });
     } 

}
