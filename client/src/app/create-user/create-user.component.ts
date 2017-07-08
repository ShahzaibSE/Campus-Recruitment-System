import { Component, OnInit } from '@angular/core';

//Auth-Service
import { AuthService } from './../auth.service';
import { CreateUserService } from './../create-user.service';

//Firebase - AngularFire
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserService: CreateUserService;

  users:FirebaseListObservable<any[]>
  af:AngularFireDatabase;

  constructor(db:AngularFireDatabase) { 
     this.users = db.list('/users');
  }

  ngOnInit() {
    this.getAllData();
  }

  createUser(firstname,lastname,password,
             confirm_password,email,role) { 

        var pattern = /[a-zA-Z][^0-9]\d/i;   //Expression to check whether there is a digit in the string or not.

        //Control Flags
        var roleCheck:boolean;
        var firstnameCheck:boolean;
        var lastnameCheck:boolean;
        var emailCheck:boolean;

        // if(pattern.test(role) == false){
        //   console.log("Role Is valid");
        //   roleCheck = true;

        //   if(pattern.test(firstname) == false){
        //     console.log("First name Is valid");
        //     firstnameCheck = true;

        //     if(pattern.test(lastname) == false){
        //       console.log("Last name Is valid");
        //       lastnameCheck = true;

        //       if(pattern.test(email) == false){
        //         console.log("Email Is valid");
        //         emailCheck = true;

        //       }else if(pattern.test(email) == true){
        //         console.log("Email is not valid");
        //         emailCheck = false;

        //       }
        //     }else if(pattern.test(lastname) == true){
        //       console.log("Last name is not valid");
        //       lastnameCheck = false
        //     }
        //   }else if(pattern.test(firstname) == true){
        //     console.log("First name Is not valid");
        //     firstnameCheck = false;
        //   }
        // }else if(pattern.test(role) == true){
        //   console.log("Role Is Invalid");
        //   roleCheck = false;
        // }

        var userInfo = {
            role: role,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            confirm_password: confirm_password,
        }

        console.log("User Information");
        console.log(userInfo);    

        

        this.users.push(userInfo);  //Pushing data to firebase
        this.users.subscribe((fireresp)=>{
          console.log("Firebase Response");
          console.log(fireresp);
        })

        // this.createUserService.create_user(userInfo);
   
  }

  getAllData(){
    var af:AngularFireDatabase;
    const queryObservable = af.list('/items', {
          query: {
            orderByChild: 'size',
            equalTo: 'large' 
          }
    });
  }

}
