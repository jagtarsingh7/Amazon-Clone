import { Component, OnInit } from '@angular/core';
import { Product } from 'src/interfaces/product';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private checkout:CheckoutService){}
  itemsInCart : Product[]=[]
  ngOnInit(): void {
    
    this.checkout.itemsDataSubscription.subscribe((res)=>{

      res.forEach((item)=>{
        this.itemsInCart.push(item)
      })
      
    })
  }



}
