import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/interfaces/userdetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private apiUrlSignUp = "http://localhost:8000/signup"
  private apiUrlSignIn = "http://localhost:8000/signin"
  private apiUrlCurrentUserAuth = "http://localhost:8000/authverify"

   
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

 