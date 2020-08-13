import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PoTemplatesModule } from '@po-ui/ng-templates';

import { LoginComponent } from './login.component';
import { LoginComponentRoutingModule } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginComponentRoutingModule,
    PoTemplatesModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
