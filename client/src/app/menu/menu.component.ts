import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navbar_appName:string;

  constructor() { }

  ngOnInit() {
    this.navbar_appName = "Welcome"
  }

  onScroll_navbar_title(){
    this.navbar_appName = "Campus Recruitment System";
    console.log("Scrolling");
    let num = 0;
    console.log(`${num++}`);
  }

}
