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

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
     email : [],
     password : [],
     role : []
    });
  }

  ngOnInit() {
  }

  logIn(username: HTMLInputElement, password: HTMLInputElement, role: HTMLSelectElement) {
    console.log(`Username : ${username.value}`);
    console.log(`Password : ${password.value}`);
    console.log(`Role : ${role.value}`);
    let credientials = {
      email : username.value,
      password : password.value,
      role : role.value
    };
    console.log(credientials);
    localStorage.setItem('username', JSON.stringify(credientials));
    this.loginForm.reset();
    // console.log(`LocalStorage:  ${localStorage}`);
  }

}
