import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { PaymentIntent, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, Observable, tap } from 'rxjs';
import { CheckoutService } from '../checkout.service';
import { GlobalstateService } from '../globalstate.service';
import { Router } from '@angular/router';
import { Product } from 'src/interfaces/product';
import { UserDetails } from 'src/interfaces/userdetails';

@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})
export class PaymentformComponent implements OnInit {

  [x: string]: any
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private chechoutService: CheckoutService, private globalState: GlobalstateService, private router: Router) { }

  paymentMessage: string | undefined | null = null

  paymentHistory: boolean | undefined

  currentUser: UserDetails | undefined

  itemsInCart: Product[] = []

  checkoutPrice:number=0

  ngOnInit(): void {

    this.globalState.itemsInCartSubscription.subscribe((res) => {
      this.itemsInCart = res
    })
    this.globalState.currentUserSubscription.subscribe((res)=>{
      console.log("currentUser-->",res)
      this.currentUser=res
    })

    this.globalState.checkoutPriceSubscription.subscribe(res=>{
      console.log("checkoutPrice-->",res)
      this.checkoutPrice=res
    })
  }

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '400',
        fontSmoothing: 'antialiased',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
      complete: {
        color: '#4caf50',
      },
    },
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paymentForm: FormGroup = this.fb.group({
    line1: ['Karol bagh', Validators.required],
    postal_code: ['110005', Validators.required],
    city: ['New Delhi', Validators.required],
    state: ['Delhi', Validators.required],
    countryCode: ['IN', Validators.required],
  });

  pay() {
    if (this.paymentForm && this.paymentForm && this.currentUser) {
      const reqBody = { ...this.currentUser, amount:this.checkoutPrice, ...this.paymentForm.value, products: [...this.itemsInCart] }
      console.log("reqBody,", reqBody)
      this.chechoutService.createPaymentIntent(reqBody)
        .pipe(
          switchMap((pi: PaymentIntent) => {
            console.log("outer pi.client_secret" + pi.client_secret)
            if (pi && pi.client_secret) {
              console.log("pi.client_secret" + pi.client_secret);
              return this.stripeService.confirmCardPayment(pi.client_secret, { //confirming the payment with stripe using the client secret we got from server
                payment_method: {
                  card: this.card?.element,
                  billing_details: {
                    name: this.paymentForm.get('name')?.value,
                  },
                },
              });
            } else {
              throw new Error('Invalid PaymentIntent or client_secret is null');
            }
          })
        )
        .subscribe((result) => {
          if (result.error) {
            console.log("error message");
            console.log(result.error.message);
            this.paymentHistory = true;
            this.paymentMessage = result.error.message
            setTimeout(() => {
              this.paymentHistory = false;
            }, 3000)
          } else {
            // The payment has been processed!
            if (result.paymentIntent?.status === 'succeeded') {
              this.globalState.emptyCart()
              this.paymentHistory = true;
              this.paymentMessage = "Thank you for the payment, Redirecting back to homepage"
              setTimeout(() => {
                this.router.navigate([''])
              }, 5000)
            }
          }
        }, (error) => {
          console.error('123 Error processing payment:', error);
          // Handle the error gracefully, show to the user, or take appropriate action
          this.paymentHistory = true;
          this.paymentMessage = error.error.code
          setTimeout(() => {
            this.paymentHistory = false;
          }, 5000)
        });
    }
  }

}
