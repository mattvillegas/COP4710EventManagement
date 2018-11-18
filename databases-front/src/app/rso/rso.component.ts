import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rso',
  templateUrl: './rso.component.html',
  styleUrls: ['./rso.component.css']
})
export class RsoComponent implements OnInit {

	inputString: string;
	user : Object;
  user_id : String;
  _id: string = null;
  CreatedByUserID : string;

	rsolist: any; 
	yourrsolist: any; 

	name: String; 


  constructor(private router: Router, public authService: AuthenticationService, private location: Location) { }

  ngOnInit() {
  	this.loadPage(); 
  }

  loadPage() {
  	var temp = sessionStorage.getItem('user');
   	this.user = JSON.parse(temp);
   	this.authService.storeUser(this.user);
   	this.user_id = this.user['id'];
  	this.getFullRSOList(); 
    this.getYourRSOList(); 
  }

  onAddButton() {
    const rso = { 
      name : this.name,
    }

    this.AddRSO(rso); 
  }

  clearFields() {
      this.name = undefined; 
  }

  getFullRSOList(){
    this.authService.getAllRSOs().subscribe(data =>{
    this.rsolist = data;
    })
  }	

  getYourRSOList(){
    this.authService.getYourRSOs().subscribe(data =>{
    this.yourrsolist = data;
    })
  }	

  AddRSO(NewRSO){
    this.authService.createRSO(NewRSO).subscribe(data=>{
    this.clearFields();
    }, err=>{
      alert('Failed to RSO.');
    });
    this.getFullRSOList();
  }

  goBack() {
    this.location.back();
  }

  onJoinButton(RSO) {
    this.authService.joinRSO(RSO.rso_id).subscribe(data =>{
      if(data !== 'Unable to join rso') {
        this.getYourRSOList();
      } else {
        alert('You are already in that rso!');
      }
    });
  }

  onLeaveButton(RSO) {
    this.authService.leaveRSO(RSO.rso_id).subscribe(data => {
      
      if(data !== 'Unable to leave') {
        this.getYourRSOList();
      }


    });
  }
}
