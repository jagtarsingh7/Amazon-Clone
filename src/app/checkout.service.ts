import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { IPaymentDetails } from 'src/interfaces/paymentDetails';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://jagtar.ap-south-1.elasticbeanstalk.com';

  createPaymentIntent(details: IPaymentDetails): Observable<PaymentIntent> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` // token is received and stored
    });
    
    return this.http.post<PaymentIntent>(`${this.apiUrl}/create-payment-intent`, details ,{headers});
  }
  // this.http.get():Observable<>
}

