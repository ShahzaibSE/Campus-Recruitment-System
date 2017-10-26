import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formgroup',
  templateUrl: './formgroup.component.html',
  styleUrls: ['./formgroup.component.css']
})
export class FormgroupComponent implements OnInit {

  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstname : new FormControl(),
      lastname : new FormControl(),
      zip : new FormControl()
    });
  }

  onSubmit() {
    const scope: any = this;
    console.log(scope.formGroup.get('firstname').value);
    console.log(scope.formGroup.get('lastname').value);
    console.log(scope.formGroup.get('zip').value);
    console.log('Form Group');
    console.log(this.formGroup.value);
  }

}
