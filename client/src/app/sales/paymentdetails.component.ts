import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from './sales';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.scss']
})
export class PaymentdetailsComponent implements OnInit {
  @Input() c: Customer;

  @Input('duePayment')
  due : Array<PaymentDue>;

  @Input('order')
  order : Array<Order>;

  @Output() shareDataToParent = new EventEmitter();
  amount : number;

  constructor(public pservice:PaymentService, public service:SalesService) {    
  }

  ngOnInit() {
  }
  calculateTotal(order:Order){
    var total: number;
    total = 0;
     for (let _order of this.order){
        total = total + _order.orderTotal;
    }  
    return total;
  }
  shareData(amount:number){   
      this.shareDataToParent.emit(amount);
  }
  }

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/