import { Component, OnInit, Input , ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'
import { PurchaseOrder } from './purchase';
import { PurchaseFormDataService } from '../services/purchaseformdata.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  personalDetails : PurchaseOrder;
  
  isValid:boolean = false;
  purchaseOrder : PurchaseOrder;

  @ViewChild('htmlData') htmlData:ElementRef;

  message:any;
  constructor(private formDataService : PurchaseFormDataService, public route:ActivatedRoute, public router:Router,  public service:PurchaseService) 
  {
    this.purchaseOrder = new PurchaseOrder();
  }

  ngOnInit() {
    let orderId = this.route.snapshot.params['purchaseOrderID'];    
    this.service.getPurchaseOrderById(orderId).subscribe(order => {
      this.purchaseOrder = order['order']; 
      this.isValid = true;
    });
    this.service.currentMessage.subscribe((message) =>{this.message = message})
  }
  
  public openPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    doc.fromHTML(DATA.innerHTML,40,25);
    doc.output('dataurlnewwindow');
  }


  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }
}
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */