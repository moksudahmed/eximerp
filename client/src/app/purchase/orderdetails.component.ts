import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { LC, SalesContract, BillOfEntry, Supplier, PurchaseRequest,  PurchaseOrder, PurchaseOrderDetails, PurchaseRequestCart, Local, Qutation } from './purchase';
import { PurchaseFormDataService  } from '../services/purchaseformdata.service';
import { PurchaseService } from '../services/purchase.service';
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare let jsPDF;

@Component({
  selector: 'app-generateorder',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  purchaseOrder : PurchaseOrder;
  
  constructor( public service:PurchaseService, public route:ActivatedRoute,
    public router:Router) { 
    this.purchaseOrder = new PurchaseOrder();
 
  }
  
  ngOnInit() {
    let orderId = this.route.snapshot.params['purchaseOrderID'];    
    this.service.getPurchaseOrderById(orderId).subscribe(order => {
      this.purchaseOrder = order['order']; 
      console.log(this.purchaseOrder);
    });
  }
  
}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */