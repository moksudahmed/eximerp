import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Items, Payment, PaymentDue } from '../sales/sales';
import { Person, Client, ContactInfo, Company, ClientAccounts } from './client';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import { ClientService  } from '../services/client.service';
import { Customer } from '../clients/client';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  //private customer: Observable<Customer[]>;    
  selectedCustomer: Customer;
  private client : Client;
  private clientAccount: ClientAccounts;
  private person: Person;
  private company: Company;
  private address: ContactInfo;

  private customer : Observable<Customer[]>;    
  private customers: Customer[];

  constructor(public service:SalesService,public cservice:ClientService
   // public pservice:PaymentService
) {    
    //this.customer = new Customer();   
}
ngOnInit() {
  this.getCustomer();       
}
onSelect(customer: Customer): void {    
  this.selectedCustomer = customer;  
}

getCustomer(): void {

    this.cservice.getCustomer().subscribe(customer => {
    this.customers = customer['customer']; 

  });
}
}
