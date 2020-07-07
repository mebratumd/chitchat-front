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

    document.querySelector('textarea').addEventListener("keypress",(e)=>{
      if (e.keyCode == 13 && !e.shiftKey) this.sendMsg();
    });

    this.room = this.auth.roomData;
    this.socket = io("http://localhost:5000/chat",{forceNew:true});
    this.socket.emit("join",{id:this.auth.roomData.socket_Room,password:this.auth.roomData.password,username:this.auth.username});

    this.socket.on("updateLog",(msg) => {

      if (this.messages.length > 1000) {
        this.messages = this.messages.slice(0,501);
      }

      this.messages.push({sender:msg.sender,txt:msg.updateLog,date:new Date(msg.date)});

      setTimeout(()=>{
        let msgs = document.querySelector('.msgs');
        if ((msgs.scrollHeight - msgs.scrollTop - msgs.clientHeight) < 50) {
          msgs.scrollTop = 1000000;
        }
      },500);

    });

    this.socket.on("newUser",(user) => {
      if (this.users.indexOf(user) == -1) {
        this.users.push(user);
      }
      if (user != this.auth.username) {
        this.socket.emit("sendToNewUser",{username:this.auth.username});
      }
    });

    this.socket.on("addUser",(user) => {
      if (this.users.indexOf(user) == -1) {
        this.users.push(user);
      }
    });

    this.socket.on("userLeft",(user) => {
      this.users.splice(this.users.indexOf(user),1);
    });

  }

  sendMsg() {
    const re = new RegExp('^\\s*$');
    if (this.text.length >= 1 && !re.test(this.text)) {

      if (this.socket.connected) {
        this.socket.emit("msg",{txt:this.text,sender:this.auth.username});
      } else {
        this.socket = io("http://localhost:5000/chat",{forceNew:true});
        this.socket.emit("join",{id:this.auth.roomData.socket_Room,password:this.auth.roomData.password,username:this.auth.username});
      }
      this.text = "";

    }



  }

}
