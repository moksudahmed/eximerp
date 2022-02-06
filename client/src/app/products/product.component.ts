import { Component, OnInit } from '@angular/core';
import { Item, Properties, Stock, Category } from './item';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  //styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private product: Item;
  
  
  private Category : Observable<Category[]>;    
  private categories: Category[];

  private property: Properties;
 // public properties: Properties[]=[];
  private propertyList: Array<Properties> = [];
  private stock: Stock;
  itemType = ['Physical', 'Virtual','Downloadable', 'Services'];
 
  model = new Item();

  submitted = false;
  constructor(public service:ProductService) {
    //this.category = new Category();   
    this.stock = new Stock();
   }

  ngOnInit() {
    this.product = new Item();
    this.getCategory();
  }
  getCategory(): void {

    this.service.getCategories().subscribe(category => {
    this.categories = category['category']; 
  
});
}


  onFormSubmit({ value, valid}: { value: Item, valid: boolean }) {
    this.product = value;
    console.log(this.product);
  //  console.log("valid: " + valid);
   //let body = JSON.stringify(this.param);
     this.service.addProduct(this.product);
 
  }
  addAccounts(){    
    console.log(this.product);
  //  this.service.addProduct(this.product)                
  //       .subscribe(()=> this.goBack())
     
  }
  addProperty(name: string, value: string){
    this.property = new Properties();
    this.property.name = name;
    this.property.value = value;
    this.propertyList.push(this.property);
    console.log(this.propertyList);
  }
  goBack(){    
    
   }
  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    this.model = new Item();
  }

  skyDog(): Item {
    let myHero =  new Item();
    console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
    return myHero;
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }

  /////////////////////////////
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/