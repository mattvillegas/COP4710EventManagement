import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboardsuper',
  templateUrl: './dashboardsuper.component.html',
  styleUrls: ['./dashboardsuper.component.css']
})
export class DashboardsuperComponent implements OnInit {

  time: String; 
  location: String;
  description: String;
  name: String;
  title: String;
  email: String;
  phone: String;
  category: String;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onAddButton(){
  	const event = { 
  		time : this.time,
  		location : this.location,
  		description : this.description,
  		name : this.name,
  		title : this.title,
  		email : this.email,
  		phone : this.phone,
  		category : this.category
  	}

  	this.AddEvent(event);

    } 

   AddEvent(NewEvent){
    this.authService.superAdminCreateEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add event.');
    });
    //this.getEventList();
    //this.getEventList();

  }

}
