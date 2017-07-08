import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  students_info = [
    {id:1,name:"Shahzaib",rollno:'2012-BSCS-011',batch:2012}
  ]

}
