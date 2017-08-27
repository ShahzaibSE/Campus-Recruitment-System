import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MdInputContainer } from '@angular/material';


@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  // formControl: FormControl;
  sku: FormControl;
  formGroup: FormGroup;

  constructor() {
    // console.log(`Our first control value: ${this.formControl.value}`);
    
    // this.formGroup = new FormGroup({
    //   sku : new FormControl('SKU')
    // });

    this.sku = new FormControl();
  }

  ngOnInit() {
  }

  // onSubmit(control) {
  onSubmit() {
    console.log('Form Control');
    console.log(this.sku.value);
    console.log('Form Validation');
    console.log(this.sku.valid);
    // console.log(control);
    // console.log('Form submitted data');
    // console.log(control.sku);
    // console.log('Form Group');
    // console.log(this.formGroup);
    // debugger;
  }

}
