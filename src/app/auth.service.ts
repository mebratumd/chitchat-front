import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roomData = <any>{};
  username = "";

  constructor(private http: HttpClient) { }

  createChat(data) {
    return this.http.post("/auth/create",data);
  }

  joinChat(data) {
    return this.http.post("/auth/join",data);
  }

  permission(room) {
    return this.http.post("/auth/permission",{name:room.name,password:room.password,username:room.username});
  }

}
