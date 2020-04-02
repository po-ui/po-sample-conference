import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SignupComponent } from './signup.component';
import { SignupComponentRoutingModule } from './signup.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignupComponentRoutingModule,
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
