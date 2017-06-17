import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class CreateUserService {

  users:FirebaseListObservable<any[]>;

  constructor(db:AngularFireDatabase) { 
    this.users = db.list('/users');
  }

  create_user(userObj) {           
    
    console.log("User created");
    console.log(userObj);

    // this.users.push(newUser);
    // this.users.subscribe((fireresp)=>{
    //   console.log("Firebase Response");
    //   console.log(fireresp);
    // })

    return false;
  }

}
