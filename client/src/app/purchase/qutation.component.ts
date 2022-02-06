import { Component, OnInit } from '@angular/core';
import { PurchaseRequest, Qutation, Supplier } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';
@Component({
  selector: 'app-qutation',
  templateUrl: './qutation.component.html',
  styleUrls: ['./qutation.component.scss']
})
export class QutationComponent implements OnInit {

  private model: Qutation;  
  supplier: Supplier[] = [];
  submitted = false;
  param: any;
  purchaseRequest: PurchaseRequest [] = [];
  constructor(public service:PurchaseService) { 
    this.model = new Qutation();
  }
  ngOnInit() {
    this.getPurchaseRequest();
   this.getSupplier();
  }

  getSupplier(){   
    this.service.getSupplier().subscribe(b => this.supplier = b);  
  }
  getPurchaseRequest(){   
  this.service.getPurchaseRequestAll().subscribe(b => this.purchaseRequest = b);  
}

  onFormSubmit({ value, valid}: { value: Qutation, valid: boolean }) {
    //this.client = value;
    console.log(this.model);
    
     this.param = {'qutation': this.model};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.service.addQutation(this.param)                    
                .subscribe(
                  (val) => {
                      alert("New Qutation successfuly created.")
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
    
    
  //  console.log("valid: " + valid);
   /* this.service.addClient(this.client)                
    .subscribe(()=> this.goBack())*/
  }
  
  goBack(){    
    
   }

}
