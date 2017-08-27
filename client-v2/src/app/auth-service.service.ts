import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceService {

  constructor() { }

  createUser(){

  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('role')) {
      return true;
    }
  }

}
