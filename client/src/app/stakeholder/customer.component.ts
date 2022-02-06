import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Items, Payment, PaymentDue } from '../sales/sales';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import { ClientService  } from '../services/client.service';
import { Customer, IndividualCustomer, CorporateCustomer } from '../clients/client';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  private customer : Observable<Customer[]>;    
  private customers: Customer[];
  private individualCustomer : Observable<IndividualCustomer[]>;    
  private corporateCustomer : Observable<CorporateCustomer[]>;    
  
  
  
  constructor(public service:SalesService,public cservice:ClientService) {    
  }

ngOnInit() {
  this.getCustomer();    
  this.getIndividualCustomer();
  this.getCorporateCustomer();   
}

getCustomer(): void {

    this.cservice.getCustomer().subscribe(customer => {
    this.customers = customer['customer']; 

  });
}


getIndividualCustomer(): void {

  this.cservice.getIndividualCustomer().subscribe(customer => {
  this.individualCustomer = customer['customer']; 

});
}


getCorporateCustomer(): void {

  this.cservice.getCorporateCustomer().subscribe(customer => {
  this.corporateCustomer = customer['customer']; 

});
}
}
