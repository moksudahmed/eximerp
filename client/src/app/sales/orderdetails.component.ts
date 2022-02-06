import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment } from './sales';
import { SalesService  } from '../services/sales.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChartOfAccount } from '../accountings/accounting';
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';

declare let jsPDF;
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  //styleUrls: ['./orderdetails.component.scss']
})

export class OrderdetailsComponent implements OnInit {

  private order: Order[];
  product: Items;
  orderDetails: OrderDetails;
  customer: Customer;
  payment: Payment;
  orderId: number;
  private accounts: ChartOfAccount;
  constructor(
    public service:SalesService,    
    public route:ActivatedRoute,
    public router:Router

  ) { 
    //this.order = new Order();  
      
    }
 
  ngOnInit() 
  {      
    
    this.getOrder();  
    
 }
 public download() {
  
          var doc = new jsPDF();
          doc.setTextColor(100);
          doc.text(20, 20, 'This is gray.');
          
          doc.setTextColor(150);
          doc.text(20, 30, 'This is light gray.');
          
          doc.setTextColor(255, 0, 0);
          doc.text(20, 40, 'This is red.');
          
          doc.setTextColor(0, 255, 0);
          doc.text(20, 50, 'This is green.');
          
          doc.setTextColor(0, 0, 255);
          doc.text(20, 60, 'doc.text(20, 20, Hello world!');

          doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
          doc.addPage();
          doc.text(20, 20, 'Do you like that?');
  
          // Save the PDF
          doc.save('Test.pdf');
      }
  
  getOrder()
  {
      this.orderId = this.route.snapshot.params['id'];
      this.service.getOrderById(this.orderId)
      .subscribe(order=>{        
        this.order = order;
      })
      console.log(this.order);
  }
  getOrderDetails(){
      this.orderId = this.route.snapshot.params['id'];
      this.service.getOrderById(this.orderId)
      .subscribe(order=>{        
        this.order = order;
      })
  }
  goBack(){
    this.router.navigate(['/sales/orders']);
  }
}
