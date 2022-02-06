import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { LC, SalesContract, BillOfEntry, Supplier, PurchaseRequest,  PurchaseOrder, PurchaseOrderDetails, PurchaseRequestCart, Local, Qutation } from './purchase';
import { PurchaseFormDataService  } from '../services/purchaseformdata.service';
import { PurchaseService } from '../services/purchase.service';
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';

declare let jsPDF;

@Component({
  selector: 'app-generateorder',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  purchaseOrder : PurchaseOrder;
  salesContract: SalesContract;
  orderDetails:PurchaseOrderDetails[];
  param : any;
  invoice : any;
  constructor(private formDataService : PurchaseFormDataService, 
    public service:PurchaseService) { 
    this.purchaseOrder = formDataService.purchaseOrder;
    this.orderDetails = formDataService.orderDetails;
    this.salesContract = formDataService.salesContract;
    this.invoice = formDataService.invoice;
 
  }

  ngOnInit() {
    
  }
  
onFormSubmit() {
  this.param = {'purchaseorder': this.purchaseOrder, 
                'orderdetails': this.orderDetails,
                'salescontract': this.salesContract};
 
  let body = JSON.stringify(this.param);
  
  this.service.addPurchaseOrder(this.param)                    
              .subscribe(
                (val) => {
                    alert("New Purchase Request successfuly created.")
                    console.log("POST call successful value returned in body", 
                                val);
                  this.invoice = val;
                  this.service.changeMessage(this.invoice);
                  // this.invoicePdf(val); 
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
                });

  }

}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */