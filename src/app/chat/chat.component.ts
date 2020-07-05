import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  socket: any;
  text = "";
  messages = [];
  room = <any>{};
  users = [];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.room = this.auth.roomData;
    this.socket = io("http://localhost:5000/chat");
    this.socket.emit("join",{id:this.auth.roomData.socket_Room,password:this.auth.roomData.password,username:this.auth.username});

    this.socket.on("updateLog",(msg)=>{
      this.messages.push({sender:msg.sender,txt:msg.updateLog,date:new Date(msg.date)});
    });

    this.socket.on("newUser",(user) => {
      this.users.push(user);
      if (user != this.auth.username) {
        this.socket.emit("sendToNewUser",{username:this.auth.username});
      }
    });

    this.socket.on("addUser",(user)=>{
      if (this.users.indexOf(user) == -1) {
        this.users.push(user);
      }
    });

    this.socket.on("userLeft",(user)=>{
      console.log(`${user} left`);
      this.users.splice(this.users.indexOf(user),1);
    });

  }

  sendMsg() {
    this.socket.emit("msg",{txt:this.text,sender:this.auth.username});
    this.text = "";
  }

}
