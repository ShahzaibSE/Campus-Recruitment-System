import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companiesInfo:Array<{}> = [
      {id:1,name:"ABC",email:"ABC@abc.com",vacancies_no:5},
      {id:2,name:"CDE",email:"CDE@cde.com",vacancies_no:4},
      {id:3,name:"FGH",email:"FGH@fgh.com",vacancies_no:3},
      {id:4,name:"IJK",email:"IJK@ijk.com",vacancies_no:2},
      {id:5,name:"LMN",email:"LMN@lmn.com",vacancies_no:1},
    ]

  constructor() { }

  ngOnInit() {
  }

}
