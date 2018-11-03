import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Publicevent } from '../_services/publicevent';
import { Privateevent } from '../_services/privateevent';
import { Rsoevent } from '../_services/rsoevent';

@Component({
  selector: 'app-dashboardsuper',
  templateUrl: './dashboardsuper.component.html',
  styleUrls: ['./dashboardsuper.component.css']
})
export class DashboardsuperComponent implements OnInit {

  inputString: string;
  user : Object;
  user_id : String;
  _id: string = null;
  CreatedByUserID : string;
  eventlist : any;

  type: String;
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
      this.loadPage();
  }

  loadPage(){
   var temp = sessionStorage.getItem('user');
   this.user = JSON.parse(temp);
   this.authService.storeUser(this.user);
   this.user_id = this.user['id'];
   //this.getEventList();
  }

  onAddButton(){
    const event = { 
      _id: this._id,
      type : this.type,
      time : this.time,
      location : this.location,
      description : this.description,
      name : this.name,
      title : this.title,
      email : this.email,
      phone : this.phone,
      category : this.category
    }

    if(this.type === "Public")
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
  }

  getEventList(){
    this.authService.getEvents().subscribe(data =>{
    this.eventlist = data;
    })
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