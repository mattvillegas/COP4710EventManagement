import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	name : string;
	title : string;
	comment : string; 

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAddCommentButton(){
    const comment = { 
      name : this.name,
      title : this.title,
      comment : this.comment
    }

    } 

}
