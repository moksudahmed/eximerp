import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from '../sales/sales';
import { Person, Client, ContactInfo, Company, ClientAccounts } from './client';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import { ClientService  } from '../services/client.service';

@Component({
  selector: 'app-customer',
  templateUrl: './clientaccount.component.html',
  styleUrls: ['./clientaccount.component.scss']
})
export class ClientAccountComponent implements OnInit {
  private customer: Observable<Customer[]>;    
  selectedCustomer: Customer;
  private client : Client;
  private clientAccount: ClientAccounts;
  private person: Person;
  private company: Company;
  private address: ContactInfo;

  private account : Observable<ClientAccounts[]>;    
  private accounts: ClientAccounts[];

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

    this.cservice.getClientAccount().subscribe(account => {
    this.accounts = account['account']; 

  });
}
}
