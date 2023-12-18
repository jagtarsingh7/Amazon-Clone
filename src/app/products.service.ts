import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from 'src/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = "https://fakestoreapi.com/products"

  getProductData(): Observable<Product[]> {

 
    return this.http.get<Product[]>(this.apiUrl)

  }

}
