import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';
import { SharedModule } from './../shared/shared.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  imports: [
    SharedModule,

    LoginRoutingModule,
    PoTemplatesModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
