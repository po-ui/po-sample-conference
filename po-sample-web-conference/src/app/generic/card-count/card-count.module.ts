
import { NgModule } from '@angular/core';

import { CardCountComponent } from './card-count.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CardCountComponent
  ],
  exports: [
    CardCountComponent
  ]
})
export class CardCountModule { }
