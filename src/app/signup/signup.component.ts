import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalstateService } from '../globalstate.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit ,OnDestroy {

  myForm!:FormGroup

  responseMessage:string | null=null

  constructor(private authService:AuthService, private formBuilder:FormBuilder, private router:Router, private globalState:GlobalstateService){
    this.myForm=this.formBuilder.group({
      name:['',Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\+91[0-9]{10}$')]],
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')]]
    })
  }
  ngOnInit(): void {
    this.globalState.updateHeaderSwitch(false)
  }

  ngOnDestroy(): void {
    this.globalState.updateHeaderSwitch(true)
  }

  onsubmit(){
    console.log(this.myForm.value)
    this.authService.signUp(this.myForm.value).subscribe((response) => {
        this.responseMessage=response;
        console.log("response",response)
        this.myForm.reset();
      },
      (error) => {
        console.error('Error occurred:', error);

        this.responseMessage=error.error.code;
      })
    }

  responseGone() {
    if(this.responseMessage=="Sign-up successful! Now please verify your email and login") {this.router.navigate(['/signin'])}
    this.myForm.reset();
    this.responseMessage=null
  }
  
}
