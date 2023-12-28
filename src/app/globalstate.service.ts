import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { UserDetails } from 'src/interfaces/userdetails';
import { Product } from 'src/interfaces/product';
import similarity from 'similarity';

@Injectable({
  providedIn: 'root'
})
export class GlobalstateService {

  constructor() { }


  private items: Product[] = []
  private price: number = 0;

  products = new BehaviorSubject<Product[]>([])
  checkoutPrice = new BehaviorSubject<number>(0)
  itemsInCart = new BehaviorSubject<Product[]>([])
  currentUser = new BehaviorSubject<UserDetails>({
    name: null,
    email: null,
    phone: null,
  })
  selectedItem = new BehaviorSubject<Product>(null!)
  searchedItem = new BehaviorSubject<string>(null!)

  currentUserSubscription = this.currentUser.asObservable()
  itemsInCartSubscription = this.itemsInCart.asObservable()
  productsSubscription = this.products.asObservable()
  selectedItemSubscription = this.selectedItem.asObservable()
  searchedItemSubscription = this.searchedItem.asObservable()
  checkoutPriceSubscription=this.checkoutPrice.asObservable()

  updateItemsInCart(i: Product) {
    this.items = this.itemsInCart.getValue()
    this.items.push(i)
    this.itemsInCart.next(this.items)
    this.price = 0
    this.itemsInCart.getValue().map((i) => {
      this.price += i.price
    })
    this.checkoutPrice.next(this.price)
  }

  removeItemsInCart(i: number) {
    this.items = this.itemsInCart.getValue()
    this.items.splice(i, 1); // Removes 1 item at the specified index
    this.itemsInCart.next(this.items)
    this.price = 0
    this.itemsInCart.getValue().map((i) => {
      this.price += i.price
    })
    this.checkoutPrice.next(this.price)
  }

  emptyCart() {
    this.itemsInCart.next([])
  }

  updateCurrentUser(user: UserDetails) {
    this.currentUser.next(user)
  }

  updateProducts(product: Product[]) {
    this.products.next(product)
  }

  updateSelectedItem(item: Product) {
    this.selectedItem.next(item)
  }

  updateSearchedItem(p: string) {
    this.searchedItem.next(p)
  }

  getProducts(): Product[] {
    return this.products.getValue();
  }

  getSelectedItem(): Product {
    return this.selectedItem.getValue()
  }

  getSearchededItem(): string {
    return this.searchedItem.getValue();
  }

  getSearchedItemsResult(searchedItem: string): Product[] {
    const res: Product[] = []
    this.products.getValue().filter((p: Product) => {
      if ((p.title.toLowerCase().includes(searchedItem.toLowerCase()) || p.description.toLowerCase().includes(searchedItem.toLowerCase())) || p.category.toLowerCase().includes(searchedItem.toLowerCase())) {
        res.push(p);
      }
    })
    return res;
  }

  getItemsInCart():Product[]{
    return this.itemsInCart.getValue()
  }
}
