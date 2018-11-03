import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.component.html',
  styleUrls: ['./dashboardadmin.component.css']
})
export class DashboardadminComponent implements OnInit {

  type: String;
  time: String; 
  location: String;
  description: String;
  name: String;
  title: String;
  email: String;
  phone: String;
  category: String;
  rsoid: String;

  //RSO: timestamp, location, description, name of person, title of event, contact email, contact phone, event category, id of rso

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onAddButton(){
  	const event = { 
      type : this.type,
  		time : this.time,
  		location : this.location,
  		description : this.description,
  		name : this.name,
  		title : this.title,
  		email : this.email,
  		phone : this.phone,
  		category : this.category,
  		rsoid : this.rsoid
  	}

  	this.AddEvent(event);

    } 

   AddEvent(NewEvent){
    this.authService.adminCreateEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add event.');
    });
    //this.getEventList();
    //this.getEventList();

  }

}
