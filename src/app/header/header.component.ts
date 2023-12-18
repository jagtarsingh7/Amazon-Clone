import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor( private checkoutService:CheckoutService){}
  numberOfItemsInCart:number=0

  ngOnInit(): void {
  
    this.checkoutService.itemsDataSubscription.subscribe(res=>{
      this.numberOfItemsInCart= res.length
      console.log(res)

    },err=>{
      console.log(err)
    })
  }

  
}
