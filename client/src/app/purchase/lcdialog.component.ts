import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LC,  PurchaseOrder, PurchaseOrderDetails, Local, Qutation } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';
import { AccountingService } from '../services/accounting.service';
import { SubSidiaryAccount } from '../accountings/accounting';
import { Person, Client, ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ClientService  } from '../services/client.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-lcdialog',
  templateUrl: './lcdialog.component.html',
  styleUrls: ['./lcdialog.component.scss']
})
export class LCDialogComponent implements OnInit {
  
  title: string;
  message: string;
  options: string[];
  answer: string = "";
  lc: LC;//  = "";
  
  private model: LC; 
  private account: SubSidiaryAccount[] = [];;  
  private insurance: Client[] = [];
  param: any;
  
  private insuranceAcc : Observable<Client[]>;  
 
  private subAccount : Observable<SubSidiaryAccount[]>;  

  constructor(public service:PurchaseService, 
              public aservice:AccountingService, 
              public cservice:ClientService, 
              public route:ActivatedRoute,
              public router:Router,
              public bsModalRef: BsModalRef
              ) {      
          
                  this.model = new LC();
                 
   }

   respond() {
    //  this.onSubmit();
      this.lc = this.model;
      this.bsModalRef.hide();
    }
    public onConfirm(): void {
      
      //this.onSubmit();                  
     // console.log('id:',id); 
  //    this.emitData.emit(11);
    //  this.onClose.next(true);        
    this.bsModalRef.hide();
  }
  public close(): void {
    this.bsModalRef.hide();
  }
  
  public onCancel(): void {
    
     this.bsModalRef.hide();
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
   
  goBack(){    
    
   }
  getSubSidiaryAccount(){   
    this.subAccount = this.aservice.getSubSadiaryAccount();  
  }

  getInsurance(){
    this.insuranceAcc = this.cservice.getInsurance();
  }

}
