import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { LoginComponentRoutingModule } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginComponentRoutingModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
