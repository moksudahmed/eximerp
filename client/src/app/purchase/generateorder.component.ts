import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { LC, SalesContract, BillOfEntry, Supplier, PurchaseRequest,  PurchaseOrder, PurchaseOrderDetails, PurchaseRequestCart, Local, Qutation } from '../purchase/purchase';
import { PurchaseFormDataService  } from '../services/purchaseformdata.service';


@Component({
  selector: 'app-generateorder',
  templateUrl: './generateorder.component.html',
  styleUrls: ['./generateorder.component.scss']
})
export class GenerateorderComponent implements OnInit {
  addressDetails : PurchaseRequest;
  private model: PurchaseOrder; 
  lc = false;
  qutation = false;
  contract = false;
  type = '';
  constructor(private formDataService : PurchaseFormDataService) { 
    this.addressDetails = formDataService.addressDetails;
    this.model = new PurchaseOrder(); 
    
  }

  ngOnInit() {
  }
  showMessage(value) {
    console.log(value);
  }
  submit(){
    console.log(this.qutation);
    console.log(this.contract);
    console.log(this.lc);
    console.log(this.type);
    this.formDataService.postData();
  }
  
}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */