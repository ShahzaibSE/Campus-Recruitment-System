import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder  } from '@angular/forms';

// AuthService
import { AuthServiceService } from './../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roles = [
    {id : 1, name : 'company'},
    {id : 2, name : 'student'}
  ];

  loginForm: FormGroup;
  // formHide_flag: boolean;

  role_select_value: string;

  constructor(fb: FormBuilder, public Auth: AuthServiceService) {
    this.loginForm = fb.group({
     email : [],
     password : [],
     role : []
    });
    // this.checkSession();
  }

  ngOnInit() {
    this.checkSession();
    // console.log(`Select value : ${this.role_select_value}`);
  }

  onchangeRole(role: any) {
    // console.log(`Role : ${role}`);
    this.role_select_value = role;
    console.log(`Role : ${this.role_select_value}`);
    // return role;
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement, role: HTMLSelectElement) {
    // let role: any = this;
    console.log(`Username : ${username.value}`);
    console.log(`Password : ${password.value}`);
    console.log(`Role : ${role.value}`);
    // console.log(`Role : ${role.selectedIndex}`);
    console.log(`Role from ngModel : ${this.role_select_value}`);
    let credientials = {
      email : username.value,
      password : password.value,
      // role : role.value
    };
    console.log(credientials);
    localStorage.setItem('username', JSON.stringify(credientials));
    this.loginForm.reset();
    // console.log(`LocalStorage:  ${localStorage}`);
  }

  checkSession() {
    var loggedIn_check = this.Auth.isLoggedIn();
    // this.formHide_flag = Boolean(loggedIn_check);
    console.log(`Checking whether If the user is logged In : ${Boolean(loggedIn_check)}`);

    return Boolean(loggedIn_check);
  }

}
