import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { Item, Stock, StockLevel } from './item';
import { SalesService  } from '../services/sales.service';
import { ProductService  } from '../services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  //styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  @Input() p: Item;
 
  @Input('stock')
  stockLevel : Array<StockLevel>;

  constructor(public service:ProductService) {    
  }

  ngOnInit() {
  }

}
