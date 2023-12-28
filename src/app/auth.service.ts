import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/interfaces/userdetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrlSignUp = "https://bison-waders.cyclic.app/signup"
  private apiUrlSignIn = "https://bison-waders.cyclic.app/signin"
  private apiUrlCurrentUserAuth = "https://bison-waders.cyclic.app/authverify"

   
   signUp(userDetails:UserDetails):Observable<any>{
    return this.http.post(this.apiUrlSignUp,userDetails)
   }

   signIn(userDetails:UserDetails):Observable<any>{
    return this.http.post(this.apiUrlSignIn,userDetails)
   }

   getCurrentUser():Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`
      });
      const Idtoken=localStorage.getItem('Idtoken')
      return this.http.post(this.apiUrlCurrentUserAuth,{Idtoken},{headers})
    }
   
  
   }

 