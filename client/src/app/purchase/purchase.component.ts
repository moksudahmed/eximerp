import { Component, OnInit } from '@angular/core';
import { PurchaseRequest,  PurchaseOrder, SalesContract, PurchaseOrderDetails, PurchaseRequestCart, LC, Local, Qutation, Supplier } from '../purchase/purchase';
import { Department } from '../organizations/organization';
import { Item } from '../products/item';
import { PurchaseService } from '../services/purchase.service';
import { OrganizationService } from '../services/organization.service';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  
  private orders: PurchaseOrder[];
  private model : Observable<PurchaseOrder[]>;  

  private qutation : Qutation[];  
  private qutations : Observable<Qutation[]>;  

  private request : PurchaseRequest[];  
  private requests : Observable<PurchaseRequest[]>;  


  private supplier : Supplier[];  
  private suppliers : Observable<Supplier[]>;  


  private lc : LC[];
  private lcs : Observable<LC[]>;

  private contract: SalesContract[];
  private contracts: Observable<SalesContract[]>;

  purchasecart: PurchaseRequestCart;
  submitted = false;
  param: any;
  selectedItem: any;
  

  private department : Observable<Department[]>;     
  
  constructor(public service:PurchaseService,
              public oservice:OrganizationService,
              public pservice:ProductService ) { 
              this.selectedItem = null;
  }

  ngOnInit() {
    this.getPurchaseOrder();
    this.getPurchaseRequest();
    this.getQutation();
    this.getSupplier();
    this.getLC();
    this.getSalesContract();

    
  }
  getDepartment(){    
    this.department = this.oservice.getDepartment();    
 }
  getPurchaseOrder2(){         
      this.model = this.service.getPurchaseOrder();
     
  }
  getPurchaseOrder(): void {

    this.service.getPurchaseOrder().subscribe(model => {
    this.orders = model['order']; 

  });
}

getQutation(): void {

  this.service.getQutation().subscribe(qutation => {
  this.qutations = qutation['qutation']; 

});
}

getPurchaseRequest(): void {

  this.service.getPurchaseRequestAll().subscribe(request => {
  this.requests = request['result']; 

});
}

getSupplier(): void {

  this.service.getSupplier().subscribe(supplier => {
  this.suppliers = supplier['result']; 

});
}

getLC(): void {

  this.service.getLetterCredit().subscribe(lc => {
  this.lcs = lc['result']; 

});
}

getSalesContract(): void {

  this.service.getSalesContract().subscribe(contract => {
  this.contracts = contract['result']; 

});
}

   filterChanged(selectedValue:string){
     
//     this.newAttribute.itemID = this.getItemID(selectedValue);     
    //console.log('value is ',this.selectedItem);        
    
    }
    
}


