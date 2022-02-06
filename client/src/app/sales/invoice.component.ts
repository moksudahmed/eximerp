import { Component, OnInit, Input , ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'
import { Order } from './sales';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SalesService  } from '../services/sales.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  //personalDetails : PurchaseOrder;
  
  isValid:boolean = false;
  order : Order;

  @ViewChild('htmlData') htmlData:ElementRef;

  message:any;
  constructor(public service:SalesService, public route:ActivatedRoute, public router:Router) 
  {
    this.order = new Order();
    
  }

  ngOnInit() {
    let orderId = this.route.snapshot.params['orderId'];    
    this.service.getOrderById(orderId).subscribe(order => {
      this.order = order['order'];
      this.isValid = false;
    });
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