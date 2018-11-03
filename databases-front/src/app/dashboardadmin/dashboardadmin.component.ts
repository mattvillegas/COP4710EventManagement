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

    if(this.type === "RSO")
       this.AddRSOEvent(event);
    else if(this.type === "Public")
       this.AddPublicEvent(event);
    else
       this.AddPrivateEvent(event);

    } 

  clearFields() {
      this.type = undefined; 
      this.time = undefined; 
      this.location = undefined; 
      this.description = undefined; 
      this.name = undefined;       
      this.title = undefined; 
      this.email = undefined; 
      this.phone = undefined; 
      this.category = undefined; 
      this.rsoid = undefined; 
  }

   AddRSOEvent(NewEvent){
    this.authService.createRSOEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add RSO event.');
    });
    //this.getEventList();
    //this.getEventList();
  }

   AddPublicEvent(NewEvent){
    this.authService.createPublicEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add public event.');
    });
    //this.getEventList();
    //this.getEventList();
  }

   AddPrivateEvent(NewEvent){
    this.authService.createPrivateEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add private event.');
    });
    //this.getEventList();
    //this.getEventList();
  }

}
