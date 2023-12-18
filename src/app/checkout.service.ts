import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  private itemsDataSubject = new BehaviorSubject<Product[]>([{
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    }
  }]
  )

  itemsDataSubscription = this.itemsDataSubject.asObservable()
  
  updateItemsData(items: Product[]) {
    this.itemsDataSubject.next(items)
  }

}
