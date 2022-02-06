import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { LC, SalesContract, BillOfEntry, Supplier, PurchaseRequest,  PurchaseOrder, PurchaseOrderDetails, PurchaseRequestCart, Local, Qutation } from './purchase';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-generateorder',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order : PurchaseOrder[];
  _order : PurchaseOrder[];
  
  
  private loading: boolean = false;

  constructor(public service:PurchaseService,) { 
    
  }
  
  ngOnInit() {
    this.getOrder();
  }
  getOrder(){   
    this.service.getPurchaseOrder().subscribe(order => {
      this.order = order['order']; 
      this._order = order['order'];
    });
    
 }
 onSearch(id) { 
  
  if(!id){
      this.order = this._order;
  }
  else{
    console.log(id);
    this.order = this._order;
    this.order = this.order.filter(item => item.purchaseOrderID === Number(id));
 // console.log(this.list);
  // this.service.getPurchaseOrderById(id).subscribe(order => {
  //   this.order = order['order']; 
  //  // console.log(order['order']);
  // });
 
  }  
  
}

  
}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */