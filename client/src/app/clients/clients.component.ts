import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from '../sales/sales';
import { ClientAccounts } from './client';
import { SalesService  } from '../services/sales.service';
import { ClientService  } from '../services/client.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
 // private customer: Observable<Customer[]>;    

  private account : Observable<ClientAccounts[]>;    
  private accounts: ClientAccounts[];
  
  constructor(public service:ClientService,
    public pservice:PaymentService
) {    
   /// this.customer = new Customer();   
}
ngOnInit() {
  console.log("test");
//this.getCustomer();       
}
getCustomer(): void {
  this.service.getCustomer().subscribe(account => {
    this.accounts = account['account']; 
  });
 
}
getCustomer2(){
 // this.customer = this.service.getClient();
  /*this.service.getClient()
  .subscribe(customer =>{         
     this.customer = customer;
   })*/
} 
   

}
