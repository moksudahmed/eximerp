import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment } from './sales';

import { SalesService  } from '../services/sales.service';
import * as jsPDF from 'jspdf';

import * as jpt from 'jspdf-autotable';

declare let jsPDF;

@Component({
  selector: 'app-orders',
  templateUrl: './client.component.html',
  //styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  private order: Order;
  private customer: Customer;

  constructor(public service:SalesService) { 

   // this.order = new Order();
    this.customer = new Customer();
  }

  ngOnInit() {
        //this.getOrders();
        this.getCustomer();
  }
  getCustomer(){
    this.service.getClientOrder()
    .subscribe(customer =>{         
      console.log(customer)
       this.customer = customer;
     })
  }
  /*getOrders(){   
    this.service.getOrder()
    .subscribe(order =>{         
       this.order = order;
     })
    }*/
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
