import { Component, OnInit } from '@angular/core';
import { LC, SalesContract, Witness, PurchaseOrder, PurchaseOrderDetails, IndividualSupplier, CorporateSupplier, _Witness, Qutation, Supplier } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';
import { AccountingService } from '../services/accounting.service';
import { SubSidiaryAccount } from '../accountings/accounting';
import { Person, Client, ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ClientService  } from '../services/client.service';
import { ViewChild, TemplateRef, Input  } from '@angular/core';
import { WitnessModalComponent } from './witness-modal.component';
import { MessageService } from '../services/modalwitness.service';
import { LcmodalService } from '../services/lcmodal.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PurchaseFormDataService  } from '../services/purchaseformdata.service';

@Component({
  selector: 'app-salescontract',
  templateUrl: './salescontract.component.html',
  styleUrls: ['./salescontract.component.scss']
})
export class SalescontractComponent implements OnInit {
  private model: SalesContract; 
  selectedSupplier:  Supplier;
  purchaseOrder : PurchaseOrder;

  private account: SubSidiaryAccount[] = [];
  
  witnessID: number;
  receivedData: any;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private witness: Witness; 
  private lcs: LC; 

  private witnesses : Observable<Witness[]>;  
  private lc : Observable<LC[]>;  
  private supplier : Observable<Supplier[]>;  
  private individual: Observable<IndividualSupplier>;
  private coorporate: Observable<CorporateSupplier>;
  private csupplier: CorporateSupplier;

  previewParm: any[]=[];
  param: any;
  answers: string[] = [];
  terms: any[] = [
                  { name: 'Weakly'},
                  { name: 'Monthly',},
                  { name: 'Yearly',}];
  route: any[] = [{name:'Jaflong'},
                  {name:'Borimary'},
                  {name:'Sutarkandi'}];
  transport: any[] =[{name:'Truck'},
                    {name:'Lori'},
                  {name:'Ship'},
                  {name:'Boat'},
                  {name:'Air'}];
  constructor(public service:PurchaseService, 
              public aservice:AccountingService, 
              public cservice:ClientService,
              private messageService: MessageService,
     //         private lcmodalService: LcmodalService,
              private _htc:HttpClient,
              private formDataService : PurchaseFormDataService
            ) {      
              this.model = formDataService.salesContract;//new SalesContract();
            //  this.witness = new Witness();
   }

   ngOnInit() {
    //this.getSubSidiaryAccount();
    //this.getInsurance();
    this.getWitness();
    this.getLc();
    this.getSupplier();
  //  console.log(this.purchaseOrder.date, this.purchaseOrder.localID);
  }
  confirm() {
    this.messageService.confirm(
      "Confirmation dialog box",
      "Are you sure you want to proceed?",
      ["Yes", "No"])
      .subscribe((w) => {
        this.witness = w;
      });     
  }
  lcconfirm() {

    this.messageService.lcconfirm(
      "Confirmation dialog box",
      "Are you sure you want to proceed?",
      ["Yes", "No"])
      .subscribe((l) => {
        this.lcs = l;
      });
  }
  
 getWitness():void{
  this.cservice.getWitness().subscribe(w => {
   this.witnesses = w['witness'];
   
 });
 }
 getLc():void{
  this.service.getLetterCredit().subscribe(l => {
   this.lc = l['lc'];
   console.log(this.lc);
 });
 }

 getSupplier(){   
  this.service.getSupplier().subscribe(supplier => {
    this.supplier = supplier['supplier']; 
 //  console.log("Supplier",this.supplier);   
  });
  
}

  onFormSubmit({ value, valid}: { value: SalesContract, valid: boolean }) {

    this.param = {'salescontract': this.model};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    console.log('Tets',this.lcs);
    //this.service.addContract(this.model, this.fieldArray, this.lcs, this.witness);
   /* this.service.addSalesContract(this.param)                    
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
   this.formDataService.postData();
  }
   
 
  goBack(){    
    
   }
   onChange(name) {
    alert(name);
   /* this.service.getSingelJournal(name)    
    .subscribe(journal =>{         
      this.journal= journal;
    })*/
  }
   onSelect(supplier: Supplier): void {        
    //alert(supplier.supplierID);
    this.selectedSupplier = supplier;  
   // if(this.selectedSupplier.category === 'individual'){
      
     this.individual = this.service.getIndividualSupplier(this.selectedSupplier.supplierID);
     console.log(this.individual);
    /*}
    else{
      this.coorporate = this.service.getCorporateSupplier(this.selectedSupplier.supplierID);      
      console.log('corporate',this.coorporate);
    
    }*/
   
  }
   addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }
   /*getSubSidiaryAccount(){   
    this.aservice.getSubSadiaryAccount().subscribe(b => this.account = b);  
  }

  getInsurance(){
    this.cservice.getInsurance().subscribe(b => this.insurance = b);  
  }*/
}
