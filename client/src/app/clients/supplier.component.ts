import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from '../sales/sales';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import { ClientService  } from '../services/client.service';
import { ClientAccounts } from './client';
import { CorporateSupplier,IndividualSupplier } from '../purchase/purchase';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  
  private supplier : Observable<CorporateSupplier[]>;    
  private suppliers: CorporateSupplier[];

  constructor(public service:ClientService) { }

  ngOnInit() {

    this.getSupplier();       

  }

  getSupplier(): void {

    this.service.getCorporateSupplier().subscribe(supplier => {
    this.suppliers = supplier['supplier']; 

  });
 
}

}
