import { Component, OnInit } from '@angular/core';
import {  Category } from './item';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  //styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  private category : Category;

  private type : Observable<Category[]>;    
  private categories: Category[];

  param: any;

  constructor(public service:ProductService) { 
    this.category = new Category();
  }
  
  ngOnInit() {    
     this.getCategory();
  }



  onFormSubmit({ value, valid}: { value: Category, valid: boolean }) {
    
    this.param = {'category': this.category};
  
   let body = JSON.stringify(this.param);
   console.log(this.param);
   this.service.addCategory(this.param)                    
               .subscribe(
                 (val) => {
                     alert("New Category successfuly created.")
                    
                 },
                 response => {
                  alert("POST call in error"+ response)
                 },
                 () => {
                     console.log("The POST observable is now completed.");
                 });
   
     this.goBack();
   
   
  }
  

 getCategory(): void {

      this.service.getCategories().subscribe(type => {
      this.categories = type['category']; 
  
    });
  }
  
  goBack(){    
      
     }
}
