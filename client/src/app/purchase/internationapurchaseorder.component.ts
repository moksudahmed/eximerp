import { Component, OnInit } from '@angular/core';
import { LC, SalesContract, BillOfEntry, Supplier, PurchaseRequest,  PurchaseOrder, PurchaseOrderDetails, PurchaseRequestCart, Local, Qutation } from './purchase';
import { PurchaseService } from '../services/purchase.service';
import { Observable } from 'rxjs/Observable';
import { CorporateSupplier , IndividualSupplier } from './purchase';
import { ClientService  } from '../services/client.service';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './internationalpurchaseorder.component.html',
  styleUrls: ['./internationalpurchaseorder.component.scss']
})
export class InternationalPurchaseorderComponent implements OnInit {
  editField: string;
  orderTotal: number;
  private model: PurchaseOrder; 
  private salesContract : Observable<SalesContract[]>;  

  private supplier : Observable<CorporateSupplier[]>;    
  private inidividualSupplier : Observable<IndividualSupplier[]>;    
  
  cart:PurchaseRequestCart[] = [];
  private purchaseRequeast: Observable<PurchaseRequest[]>;
  orderDetail:PurchaseOrderDetails;
  private orderDetails:PurchaseOrderDetails[] = [];
  private price: any = {};
  private local :Supplier[] = [];
  private qutation: Observable<Qutation[]>;
  
  private branchName;
  submitted = false;
  param: any;
  lc : LC[] = [];  
  billOfEntry: BillOfEntry[] = [];  

  constructor(public service:PurchaseService, public cservice:ClientService) { 
    this.model = new PurchaseOrder();  
    this.orderTotal = 100000.00;
  }

  ngOnInit() {
    this.getRequest();
    this.getLocalSupplier();
    this.getSalesContract();
   // this.getBillOfEntry();
    this.getQutation();
   // this.getLC(); 
   this.branchName = 'Borosora';//localStorage.getItem('branchName');
  }
  getRequest(){   
    this.service.getPurchaseRequestByStatus('processing').subscribe(purchaseRequeast => {
      this.purchaseRequeast = purchaseRequeast['purchaserequest']; 
   //   console.log(this.purchaseRequeast);   
    });
    
 }
 getRequestCart(id:number){ 
  this.service.getPurchaseOrderCart(id).subscribe(x => {
    this.cart = x['cart']; 
  });  
  console.log(this.cart);
}
getLC(){         
  this.service.getLetterCredit().subscribe(b => this.lc = b);      
}
getBillOfEntry(){         
  this.service.getBillOfEntry().subscribe(b => this.billOfEntry = b);      
}
getSalesContract(){ 
  this.service.getSalesContract().subscribe(x => {
    this.salesContract = x['result']; 
  });  
}
getLocalSupplier(): void{
  this.service.getLocalSupplier().subscribe(local => {
    this.local = local['supplier']; 
  });
}
getQutation(): void{   
  this.service.getQutation().subscribe(qutation => {
    this.qutation = qutation['qutation']; 
  });
}

formatOrderDetails(){
  //let delrow=Object.keys(this.purchasecart);
  for(var j =0; j< Object.keys(this.cart).length; j++)
  {        
    this.orderDetail = new PurchaseOrderDetails;    
    this.orderDetail.itemID = this.cart[j]['itemID'];
    this.orderDetail.quantity = Number(this.cart[j]['quantity']);    
    this.orderDetail.weight = Number(this.cart[j]['weight']);
    this.orderDetail.unitPrice = Number(this.cart[j]['unitPrice']);;    
    this.orderDetails.push(this.orderDetail);            
 }    
 console.log(this.orderDetails);
   return 0;  
}
onFormSubmit({ value, valid}: { value: PurchaseOrder, valid: boolean }) {
  let temp = this.model.localID;
  this.model.localID = Number(temp);

  temp = this.model.purchaseRequestID;
  this.model.purchaseRequestID = Number(temp);
  
  
  this.formatOrderDetails();
  this.param = {'purchaseorder': this.model, 'orderdetails': this.orderDetails};
 
  let body = JSON.stringify(this.param);
  console.log(this.param);
  this.service.addPurchaseOrder(this.param);
  /*this.service.addPurchaseOrder(this.param)                    
              .subscribe(
                (val) => {
                    alert("New Purchase Request successfuly created.")
                    console.log("POST call successful value returned in body", 
                                val);
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
                });
  
    this.goBack();
*/
  
}
  filterChanged(selectedValue:number){ 
  //    alert(selectedValue);
      this.getRequestCart(selectedValue); 
      var index = this.local.indexOf(this.local.filter(x => x.supplierID == selectedValue)[0]); 
      console.log(this.local[index].category, this.local[index].type);
      if (this.local[index].type == 'local'){
       
        if(this.local[index].category == 'individual'){
          this.cservice.getIndividualSupplierType('local').subscribe(supplier => {
            this.inidividualSupplier = supplier['supplier']; 
            console.log(this.inidividualSupplier)
          });
          
        }
        else{
          this.cservice.getCorporateSupplierType('corporate').subscribe(supplier => {
            this.supplier = supplier['supplier']; 
            console.log(this.supplier);
          });
        
        }
      }
  }

  cartChanged(selectedValue:number){ 
    alert(selectedValue);
  }
   removeItem(itemNo: number){
    let index = this.cart.findIndex(item => item.itemID === itemNo); //find index in your array
    this.cart.splice(index, 1);    
 }
  
  goBack(){    
    
   }

   updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.cart[id][property] = editField;
  }

  remove(id: any) {
    this.cart.push(this.cart[id]);
    this.cart.splice(id, 1);
  }

  add() {
    if (this.cart.length > 0) {
      const person = this.cart[0];
      this.cart.push(person);
      this.cart.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}
