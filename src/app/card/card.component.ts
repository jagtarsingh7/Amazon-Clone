import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/interfaces/product';
import { GlobalstateService } from '../globalstate.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  constructor(private globalState:GlobalstateService){}

  @Input()item!:Product 

  @Input() ind:number | undefined

  @Output() customEvent = new EventEmitter<Product>()

  selectItems():void{
    // this.customEvent.emit(this.item)
    this.globalState.updateItemsInCart(this.item)
  }

 

}
