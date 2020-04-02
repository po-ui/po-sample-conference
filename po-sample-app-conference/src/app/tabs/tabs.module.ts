import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TabsComponentRoutingModule } from './tabs.routing';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabsComponentRoutingModule,
  ],
  declarations: [TabsComponent]
})
export class TabsModule { }
