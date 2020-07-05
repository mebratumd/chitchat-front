import { Component,OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  join: boolean = false;
  create: boolean = false;
  room = {};
  newroom = {};
  errors = [];
  success: boolean = false;
  createSub: Subscription;
  joinSub: Subscription;


  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.createSub) this.createSub.unsubscribe();
    if (this.joinSub) this.joinSub.unsubscribe();
  }

  toggle(option) {
    if (option === 'j') {
      this.success = false;
      this.errors = [];
      this.newroom = {};
      this.room = {};
      this.join = true;
      this.create = false;
    }
    if (option === 'c') {
      this.success = false;
      this.errors = [];
      this.room = {};
      this.newroom = {};
      this.create = true;
      this.join = false;
    }
  }

  createMe(info) {
    this.createSub = this.auth.createChat(info).subscribe((data: any)=>{
      this.errors = [];
      this.success = true;
    },(err)=>{
      this.success = false;
      this.errors = err.error.errors;
    });
  }

  joinMe(info) {
    this.joinSub = this.auth.joinChat(info).subscribe((data: any)=>{
      this.auth.roomData = data.room;
      this.auth.username = info.username;
      this.router.navigate([`/chat/${info.name}`]);
    },(err)=>{
      this.errors = err.error.errors;
    });
  }

}
