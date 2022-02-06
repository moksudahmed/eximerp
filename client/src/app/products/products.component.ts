import { Component, OnInit } from '@angular/core';
import { Item, Stock, StockLevel } from './item';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private item : Observable<Item[]>;    
  private items: Item[];

  private product: Item;
  private stock: Stock;
  stockLevel:StockLevel[] = [];
  selectedItem: Item;

  submitted = false;
  constructor(public service:ProductService) { 
    this.product = new Item();
    this.stock = new Stock();
   
  }

  ngOnInit() {
    
    this.getProducts();
   // this.load(1);
  }
  load(id:number){
   // this.servicegetStockById(id).subscribe(b => this.stockLevel = b);
   this.service.getStockLevelById(id).subscribe(level => {
    this.stockLevel = level['stocklevel']; 
  });

  }
  
  onSelect(item: Item): void {    
    this.selectedItem = item;
    this.load(this.selectedItem.itemID);   
    //this.loadOrders(this.selectedCustomer.clientAccountID);    
  }
  getProducts(): void {

    this.service.getProduct().subscribe(item => {
    this.items = item['items']; 

  });
}
  

  goBack(){    
    
   }
 
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/