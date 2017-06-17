import { Injectable } from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AuthService {
  
  http:Http;

  constructor(http:Http) { 
    this.http = http;
  }


  //Serverless logIn function dependent on browser's localstorage.
  login(email:HTMLInputElement,password:HTMLInputElement,role:HTMLSelectElement){
    
    //Data to be posted on server.
    var login_user_obj = {
      email:email.value,
      password:password.value,
      role:role.value
    }

    console.log(`Login user object: ${login_user_obj}`);

    var loginResponse = localStorage.getItem(email.value); 
    console.log(`LoggedIn user response : ${loginResponse}`);

  }  

  // login(email:HTMLInputElement,password:HTMLInputElement,role:HTMLSelectElement){
    
  //   //Data to be posted on server.
  //   var login_user_obj = {
  //     email:email.value,
  //     password:password.value,
  //     role:role.value
  //   }

  //   console.log(`Login user object: ${login_user_obj}`);

  //   var requestOptions = new RequestOptions();

  //   //Setting request headers.
  //   var headers = new Headers();
  //   headers.append('content-type','application/json');

  //   //Placing headers in request options.
  //   requestOptions.merge(headers)

  //   this.http.post('http://localhost:3002/login',login_user_obj,requestOptions).
  //    subscribe((res)=>{
  //      console.log(`Logged In user: ${res}`);
  //    })

  // }

}
