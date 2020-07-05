import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {

  permissionSub: Subscription;

  constructor(private auth: AuthService,private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let p = new Promise((resolve,reject)=>{
      this.auth.roomData['username'] = this.auth.username;
      this.permissionSub = this.auth.permission(this.auth.roomData).subscribe((data: any)=>{
        this.auth.roomData = data.room;
        resolve();
      },(err)=>{
        reject();
      });
    });

    return p.then(() => {
      this.permissionSub.unsubscribe();
      return true;
    }).catch(() => {
      this.permissionSub.unsubscribe();
      this.router.navigate(['/']);
      return false;
    })

  }

}
