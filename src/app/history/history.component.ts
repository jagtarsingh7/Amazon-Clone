import { Component } from '@angular/core';
import { Product } from 'src/interfaces/product';
import { IPurchasedItems } from 'src/interfaces/purchasedItems';
import { UserDetails } from 'src/interfaces/userdetails';
import { GlobalstateService } from '../globalstate.service';
import { PurchaseditemsService } from '../purchaseditems.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  constructor(private globalState: GlobalstateService, private purchasedItems: PurchaseditemsService) { }

  itemsInCart: Product[] = []
  products: Product[] = []
  totalCheckoutCost: number = 0
  currentUser: UserDetails | undefined
  purchasedProducts: IPurchasedItems[] | undefined

  ngOnInit(): void {
    this.globalState.itemsInCartSubscription.subscribe((res) => {
      this.itemsInCart = res;
    })

    this.globalState.checkoutPrice.subscribe((res) => {
      this.totalCheckoutCost = res
    })

    this.globalState.currentUserSubscription.subscribe((res) => {
      this.currentUser = res;
      if (this.currentUser) {
        console.log("u--->", this.currentUser)
        this.purchasedItems.getPuchasedItems(this.currentUser.email).subscribe((res) => {
          console.log("res-->", res); 
          // res.map((r) => {
          // console.log("r-->", r); 
          // this.purchasedProducts?.push(r);
          //  console.log("purchasedProducts", this.purchasedProducts) })
          this.purchasedProducts=res;
          console.log("r-->", this.purchasedProducts); 

        })
      }
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
