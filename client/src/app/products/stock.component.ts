import { Component, OnInit } from '@angular/core';
import { Item, Stock } from './item';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  //styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  private stock : Observable<Stock[]>;    
  private stocks: Stock[];

 

  private product: Item;
 // private stock: Stock;
  stockLevel:Stock[] = [];
 
  
  submitted = false;
  constructor(public service:ProductService) { }

  ngOnInit() {
    
    this.getStock();
    
  }
  getStock(): void {

    this.service.getStock().subscribe(stock => {
    this.stocks = stock['stock']; 

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