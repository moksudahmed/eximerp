import { Component, OnInit } from '@angular/core';
import { Product, Order, OrderDetails, Customer, Items, Payment } from './sales';
import { SalesService  } from '../services/sales.service';
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';
import { Observable } from 'rxjs/Observable';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

declare let jsPDF;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
 // styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  //private order: Order;

  private order : Observable<Order[]>;    
  private orders: Order[];
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();

  constructor(public service:SalesService, public datepipe: DatePipe) { 

//    this.order = new Order();

  }

  ngOnInit() {
        this.getOrders();
  }
  
  getOrders(): void {

    this.service.getOrder().subscribe(order => {
    this.orders = order['order']; 

  });
}


    deleteOrder(){

    }
    show(id:number){

    }      

    
    report(){              
        var headers =([
          "Order_ID",
          "Order_Date",
          "Order_Total",
          "Discount",
          "Net_Total",
          "Status",
          "vlt"
        ]);
       
     //   var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
        var doc = new jsPDF({
          orientation: "l",
          unit: 'px',
          format: 'a4',
          putOnlyUsedFonts:true,
          floatPrecision: 16, // or "smart", default is 16
          userUnit:1.0,
          hotfixes:["8"]
         });
        //doc.setFontSize(4);
        doc.table(18, 18, this.generateData(100), headers, { autoSize: true });
        doc.save("a4.pdf");
    }

   createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          Order_ID: keys[i],
          Order_Date: keys[i],
          Order_Total: keys[i],
          Discount: 65,
          Net_Total: "center",
          Status: 0
        });
      }
      return result;
    }
    generateData(amount) {
      var result = [];
      var data = {
        Order_ID:"1",
        Order_Date: "100",
        Order_Total: "GameGroup",
        Discount: "XPTO2",
        Net_Total: "25",
        Status: "20485861",
        vlt: "0"
      };
      
      for(var i =0; i< Object.keys(this.orders).length; i++){  
         data.Order_ID = (this.orders[i].customerOrderID).toString();      
         data.Order_Date =(this.datepipe.transform(this.orders[i].orderDate, 'yyyy-MM-dd')).toString();
         data.Order_Total =(this.orders[i].orderTotal).toString();
         data.Discount =(this.orders[i].discount).toString();
         data.Net_Total =(this.orders[i].netPay).toString();
         data.Status =(this.orders[i].status).toString();
         
         
         result.push(Object.assign({}, data));       
        }    
      return result;
    }
}
