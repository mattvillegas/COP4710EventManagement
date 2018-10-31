import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-registersuper',
  templateUrl: './registersuper.component.html',
  styleUrls: ['./registersuper.component.css']
})
export class RegistersuperComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  university: String;
  accesskey: String; 

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSuperRegister(){
  	const superadmin = { 
  		name: this.name,
  		email: this.email,
  		password : this.password,
  		university : this.university,
  		accesskey : this.accesskey
  	};

  	this.authService.registerSuper(superadmin).subscribe( 
  	  data => {
        //alert('You are registered as a super admin and can now log in');
        this.router.navigate(['/login']); 
      }, error => {
        //alert('Couldn't create super admin account, please try again');
        this.router.navigate(['/registersuper']);
      });
     } 

}
