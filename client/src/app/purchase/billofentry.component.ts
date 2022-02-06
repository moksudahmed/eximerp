import { Component, OnInit } from '@angular/core';
import { BillOfEntry,  PurchaseOrder, PurchaseOrderDetails, Local, Qutation } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-billofentry',
  templateUrl: './billofentry.component.html',
  styleUrls: ['./billofentry.component.scss']
})
export class BillofentryComponent implements OnInit {
  private model: BillOfEntry;
  submitted = false;
  param: any;    
  constructor(public service:PurchaseService) { 
    this.model = new BillOfEntry();  
    
  }

  ngOnInit() {
  }
  onFormSubmit({ value, valid}: { value: BillOfEntry, valid: boolean }) {
      

    this.param = {'billofentry': this.model};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.service.addBillOfEntry(this.param)                    
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
    
    
  }
  goBack(){    
    
   }
}
