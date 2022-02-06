import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from './sales';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';

declare let jsPDF;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers:[PaymentService]
})
export class PaymentComponent implements OnInit {
  private order: Order;
  private payment: Payment;
  private _payment: Payment;
  private customer: Observable<Customer[]>;    
  selectedCustomer: Customer;
  private customerOrder: Customer;
  due:PaymentDue[] = [];
  orders:Order[] = [];  
  amount: number;
  param: any;
  
  constructor(public service:SalesService,
              public pservice:PaymentService
  ) {    
    this.payment = new Payment();
    this._payment = new Payment();        
  }
  ngOnInit() {
        this.getCustomer();       
  }
  shareDataToParent(sharedText:number){    
    this.addPayment(sharedText);
    //console.log('Prent:'+this.payment);
  }
  load(id:number){
    this.pservice.getData(id).subscribe(b => this.due = b);
}
loadOrders(id:number){
  this.service.getData(id).subscribe(b => this.orders = b);
}
  
onSelect(customer: Customer): void {    
      this.selectedCustomer = customer;
      this.load(this.selectedCustomer.clientAccountID);   
      this.loadOrders(this.selectedCustomer.clientAccountID);    
    }
    getOrderByCustomer(id:number){      
      for(var i =0; i< Object.keys(this.order).length; i++){
          if(this.order[i].clientAccountID === id)
             return this.order[i];
      }     
     return null;
  }  
    getCustomer(){
      this.customer = this.service.getClient();
      
    } 
    getPymentByOrder(id:number){
      var j =0;      
      for(var i =0; i< Object.keys(this.payment).length; i++){          
            if(Number(this.payment[i].billID)  === Number(id))               
               
                this._payment[j++] = this.payment[i];     
            }      
       }
    calculateDue(){
        

    }
    addPayment(amount: number) {    
    
    this.payment.amount = amount;
    this.payment.paymentType ='cash';
    this.payment.status = 'paid';       
    this.payment.clientAccountID = this.selectedCustomer.clientAccountID;        
    this.param = {'payment': this.payment};      
    let body = JSON.stringify(this.param);
    console.log(this.param);        
    this.service.addPayment(this.param)                    
               .subscribe(
                 (val) => {
                     console.log("POST call successful value returned in body", val);
                 },
                 response => {
                     console.log("POST call in error", response);
                 },
                 () => {
                     console.log("The POST observable is now completed.");
                 });        
   }

    deleteOrder(){

    }
    show(id:number){

    }    
    invoicePdf(orderNo: number){
      var doc = new jsPDF();
      doc.setTextColor(100);
      doc.text(20, 20, 'Ok');      
      
      doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
      doc.addPage();
      doc.text(20, 20, 'Do you like that?');

      // Save the PDF
      doc.save('invoice.pdf');
    }
    print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Print tab</title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
  }
}
