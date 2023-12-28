import { Component, OnInit } from '@angular/core';
import { Product } from 'src/interfaces/product';
import {  GlobalstateService } from '../globalstate.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private globalState:GlobalstateService) { }

  items: Product[] | undefined

  searchedItem: string=''

  cart: Product[] =[]

  ngOnInit(): void {
 
    this.globalState.productsSubscription.subscribe(res => {
      this.items = res
    }, err => {
      console.log(err) 
    })

    this.globalState.searchedItemSubscription.subscribe((res)=>{

      if(res!="")
      {

        this.items=this.globalState.getSearchedItemsResult(res)
        this.searchedItem=res
      }
      else{
        this.items=this.globalState.getProducts()
        this.searchedItem=''
      }

    },err => {
      console.log(err) 
    })
  }

}

