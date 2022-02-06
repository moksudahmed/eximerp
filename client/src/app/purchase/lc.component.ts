import { Component, OnInit } from '@angular/core';
import { LC,  PurchaseOrder, PurchaseOrderDetails, Local, Qutation } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';
import { AccountingService } from '../services/accounting.service';
import { SubSidiaryAccount } from '../accountings/accounting';
import { Person, Client,  ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ClientService  } from '../services/client.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.scss']
})
export class LCComponent implements OnInit {
  private model: LC; 
  private account: SubSidiaryAccount[] = [];;  
  private insurance: Client[] = [];
  param: any;
 
  constructor(public service:PurchaseService, 
              public aservice:AccountingService, 
              public cservice:ClientService, 
              public route:ActivatedRoute,
              public router:Router) {      
          
                  this.model = new LC();
                 
   }

  ngOnInit() {
    this.getSubSidiaryAccount();
    this.getInsurance();
    this.getContract();
  }
  getContract(){
    var Id = this.route.snapshot.params['purchaseRequestID'];
   
    this.model.HSCode = Id;
    
  }
  onFormSubmit({ value, valid}: { value: PurchaseOrder, valid: boolean }) {
      
    
  
    this.param = {'lc': this.model};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.service.addLC(this.param)                    
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
  getSubSidiaryAccount(){   
    this.aservice.getSubSadiaryAccount().subscribe(b => this.account = b);  
  }

  getInsurance(){
    this.cservice.getInsurance().subscribe(b => this.insurance = b);  
  }
}
