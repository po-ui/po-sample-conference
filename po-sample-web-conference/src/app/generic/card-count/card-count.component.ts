import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-count',
  templateUrl: './card-count.component.html',
  styleUrls: ['./card-count.component.css']
})
export class CardCountComponent {

  @Input('entityCount') count: number;
  @Input('entityIcon') icon: string;
  @Input('entityName') name: string;

}
