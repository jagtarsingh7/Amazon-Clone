import { Component, OnInit } from '@angular/core';
import { Product } from 'src/interfaces/product';
import { CheckoutService } from '../checkout.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private productService: ProductsService, private checkoutService:CheckoutService) { }

  items: Product[] | undefined

  cart: Product[] =[]

  ngOnInit(): void {
    this.productService.getProductData().subscribe(res => {
      this.items = res
    }, err => {
      console.log(err)
    })
  }

  addToCart($event: Product) {
    console.log("event captured"+$event.price)
    this.cart?.push($event)
    console.log(this.cart?.length)
    if(this.cart)
    {
      this.checkoutService.updateItemsData(this.cart)
      console.log("updateItemsData captured"+this.cart)
    }
  }


}

