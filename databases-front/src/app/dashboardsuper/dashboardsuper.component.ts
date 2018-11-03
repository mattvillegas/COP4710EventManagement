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
  end : String; 
  start : String; 

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onAddButton(){
  	const event = { 
      title : this.title, 
  		description : this.description,
  		location : this.location,
  		start : this.start,
  		end : this.end,
  	}

  	this.AddEvent(event);

    } 

    clearFields(){
      this.title = undefined;
      this.location = undefined;
      this.description = undefined; 
      this.start = undefined; 
      this.end = undefined; 
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
