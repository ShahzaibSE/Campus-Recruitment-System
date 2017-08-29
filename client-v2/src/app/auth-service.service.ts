import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceService {

  constructor() { }

  createUser(){

  }

  // isLoggedIn(): boolean {
  //   if (localStorage.getItem('role')) {
  //     return true;
  //   }
  // }

  isLoggedIn(): boolean {
    var credientials = JSON.parse(localStorage.getItem('username'));
    console.log(credientials);
    if (credientials == null) {
      console.log('Please logIn');
      return false;
    }
    // debugger;
    if (credientials.email) {
      console.log('If user exist check his/her role');
      if (credientials.role && credientials.role === 'student' || credientials.role === 'company') {
        return true;
      } else {
        return false;
      }
    }else if (!credientials.email) {
      console.log('Please log In');
    }
  }

}
