import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {

  myForm: FormGroup;
  lastname: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'firstname' : ['Shahzaib'],
      'lastname' : ['', Validators.required],
      'zip' : [],
    });

    this.lastname = this.myForm.controls['lastname'];
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Button clicked');
    console.log(this.myForm.get('firstname').value);
    console.log(this.myForm.get('lastname').value);
    console.log(this.myForm.get('zip').value);
  }

}
