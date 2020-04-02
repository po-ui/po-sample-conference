import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AboutComponentRoutingModule } from './about.routing';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AboutComponentRoutingModule,
  ],
  declarations: [AboutComponent],
  bootstrap: [AboutComponent]
})
export class AboutModule { }
