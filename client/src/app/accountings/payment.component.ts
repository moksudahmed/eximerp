import { Component, OnInit } from '@angular/core';
import { PurchaseRequest,  PurchaseOrder, SalesContract, PurchaseOrderDetails, PurchaseRequestCart, LC, Local, Qutation, Supplier } from '../purchase/purchase';
import { Department } from '../organizations/organization';
import { Item } from '../products/item';
import { PurchaseService } from '../services/purchase.service';
import { OrganizationService } from '../services/organization.service';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './accounting';
import { ChartOfAccount } from './accounting';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  private transactions:Transaction;
 
  private accounts : Observable<ChartOfAccount[]>;  
  private model : Observable<PurchaseOrder[]>;  
  private qutation : Observable<Qutation[]>;  
  private supplier : Observable<Supplier[]>;  
  private lc : Observable<LC[]>;
  private salesContract: Observable<SalesContract[]>;
  
  purchasecart: PurchaseRequestCart;
  submitted = false;
  param: any;
  selectedItem: any;
  

  private department : Observable<Department[]>;     
  
  constructor(public service:PurchaseService,
             // public oservice:OrganizationService,
             //
             // public pservice:ProductService
             ) { 
              this.selectedItem = null;
  }

  ngOnInit() {
    this.getPurchaseOrder();
    this.getQutation();
    this.getSupplier();
    this.getLC();
    this.geetSalesContract();

    
  }
  getDepartment(){    
   // this.department = this.oservice.getDepartment();    
 }
 geetSalesContract(){
  // this.salesContract = this.service.getSalesContract();
 }
  getPurchaseOrder(){         
      //this.model = this.service.getPurchaseOrder();
     
  }
  getQutation(){  
   // this.qutation = this.service.getQutation();
  }
  getSupplier(){         
    //this.supplier = this.service.getSupplier();
  }

  getLC(){         
   // this.lc = this.service.getLetterCredit();
  }
   filterChanged(selectedValue:string){
     
//     this.newAttribute.itemID = this.getItemID(selectedValue);     
    //console.log('value is ',this.selectedItem);        
    
    }
    
}


