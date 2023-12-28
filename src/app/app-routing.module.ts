import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentformComponent } from './paymentform/paymentform.component';
import { SignupComponent } from './signup/signup.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
    {path:'',component:HomepageComponent},
    {path:'cart',component:CartComponent},
    {path:'signin',component:SignInComponent},
    {path:'signup',component:SignupComponent},
    {path:'checkout',component:PaymentformComponent},
    {path:'history',component:HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
