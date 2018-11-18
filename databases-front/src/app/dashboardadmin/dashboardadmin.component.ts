import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Publicevent } from '../_services/publicevent';
import { Privateevent } from '../_services/privateevent';
import { Rsoevent } from '../_services/rsoevent';

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.component.html',
  styleUrls: ['./dashboardadmin.component.css']
})
export class DashboardadminComponent implements OnInit {

  inputString: String;
  user : Object;
  user_id : String;

  publicevent : Publicevent;
  privateevent : Privateevent;
  rsoevent : Rsoevent;
  eventlist : any;
  commentlist : any; 

  publiceventlist : any;

  _id: string = null;
  CreatedByUserID : string;

  type: String;
  time: String; 
  loc: String;
  desc: String;
  contact_name: String;
  event_name: String;
  contact_email: String;
  contact_phone: String;
  event_category: String;
  commenttext: String;
  openform = false;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage(){
   var temp = sessionStorage.getItem('user');
   this.user = JSON.parse(temp);
   this.authService.storeUser(this.user);
   this.user_id = this.user['id'];
   this.getPublicEventList();
   this.getEventList();
   this.getCommentList(); 
  }

  onAddButton(){
    const event = { 
      _id: this._id,
      type : this.type,
      time : this.time,
      loc : this.loc,
      desc : this.desc,
      contact_name : this.contact_name,
      event_name : this.event_name,
      contact_email : this.contact_email,
      contact_phone : this.contact_phone,
      event_category : this.event_category,
      CreatedByUserID : this.user["id"]
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
      this.loc = undefined; 
      this.desc = undefined; 
      this.contact_name = undefined;       
      this.event_name = undefined; 
      this.contact_email = undefined; 
      this.contact_phone = undefined; 
      this.event_category = undefined; 
  }

  getEventList(){
    this.authService.getEvents().subscribe(data =>{
    this.eventlist = data;
    })
  }

    getPublicEventList(){
    this.authService.getPublicEvents().subscribe(data =>{
    this.publiceventlist = data;
    })
  }

  getCommentList(){
    this.authService.getComments().subscribe(data =>{
    this.commentlist = data;
    })
  }

  onDeleteButton(comment){
    this.authService.deleteComment(comment.time, comment.location).subscribe(data =>{
    if(data === "deleted comment"){
        this.getCommentList();
        this.getCommentList();
      }
    })
  }

  onEditButton(time, location){
    this.authService.editComment(this.commenttext, time, location).subscribe(data =>{
    if(data === "updated comment"){
        this.getCommentList();
        this.getCommentList();
      }
    })
  }

  search_event(){
    if(this.inputString == undefined){
      // alert('Empty, so nothing found.');
      return false;
    }
  }

   AddRSOEvent(NewEvent){
    this.authService.createRSOEvent(NewEvent).subscribe(data=>{
    if(data === "Not enough members")
      alert('Not enough members to add RSO event.');
    else
      this.clearFields();
    }, err=>{
      alert('Failed to add RSO event ' + this.event_name + ' at ' + this.time + ' and ' + this.loc);
    });
    this.getEventList();
    this.getEventList();
    this.getPublicEventList();
    this.getPublicEventList();
  }

   AddPublicEvent(NewEvent){
    this.authService.createPublicEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add public event ' + this.event_name + ' at ' + this.time + ' and ' + this.loc);
    });
    this.getEventList();
    this.getEventList();
    this.getPublicEventList();
    this.getPublicEventList();
  }

   AddPrivateEvent(NewEvent){
    this.authService.createPrivateEvent(NewEvent).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add private event ' + this.event_name + ' at ' + this.time + ' and ' + this.loc);
    });
    this.getEventList();
    this.getEventList();
    this.getPublicEventList();
    this.getPublicEventList();
  }

  showForm() {
    this.openform = true;
  }
}
