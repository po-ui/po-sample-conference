import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PoTemplatesModule } from '@po-ui/ng-templates';

import { SignupComponent } from './signup.component';
import { SignupComponentRoutingModule } from './signup.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignupComponentRoutingModule,
    PoTemplatesModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
