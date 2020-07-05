import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './landing/landing.component';
import { ChatComponent } from './chat/chat.component';

import { LogGuard } from './log.guard';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'chat/:room',component:ChatComponent,canActivate:[LogGuard]}
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
