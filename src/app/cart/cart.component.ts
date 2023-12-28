import { Component, OnInit } from '@angular/core';
import { Product } from 'src/interfaces/product';
import { UserDetails } from 'src/interfaces/userdetails';
import { GlobalstateService } from '../globalstate.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private globalState: GlobalstateService) { }

  itemsInCart: Product[] = []
  products:Product[]=[]
  totalCheckoutCost: number = 0

  currentUser:UserDetails | undefined

  ngOnInit(): void {
    this.globalState.itemsInCartSubscription.subscribe((res) => {
      this.itemsInCart=res;
    })

    this.globalState.checkoutPrice.subscribe((res) => {
      this.totalCheckoutCost = res
    })

    this.globalState.currentUserSubscription.subscribe((res)=>{
      this.currentUser=res;
    })
    
    this.globalState.productsSubscription.subscribe((res) => {
      this.products = res
    })
  }


  addToCart(item: Product) {
    console.log("yoy", this.itemsInCart)
    this.globalState.updateItemsInCart(item)
  }

  removeFromCart(index: number) {
    console.log(index)
    console.log(this.itemsInCart)

    this.globalState.removeItemsInCart(index)
  }


}
