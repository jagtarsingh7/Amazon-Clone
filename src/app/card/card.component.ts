import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/interfaces/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()item:Product | undefined

  @Input() ind:number|undefined

  @Output() customEvent = new EventEmitter<Product>()


  selectItems():void{
    console.log(this.item)
    this.customEvent.emit(this.item)
  }

}
