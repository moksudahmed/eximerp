/* tslint:disable:component-class-suffix */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser'

import { Subject } from 'rxjs/Subject';




@Component({
  selector: 'my-app',
  templateUrl: 'test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit{
  heroForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      street: '',
      city: '',
      state: '',
      zip: '',
      power: '',
      sidekick: ''
    });
  }

  public ngOnInit(): void {
  }
  
}
