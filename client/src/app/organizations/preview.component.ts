import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { Organization, Branch, Department, Factory, Warehouse} from '../organizations/organization';
import { Person, Client, Owner, Partnership,ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ProfileFormDataService  } from '../services/profileformdata.service';
import { OrganizationService  } from '../services/organization.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})


export class PreviewComponent implements OnInit {
  organization:Organization;
  department :Department;      
  factory : Factory;     
  warehouse : Warehouse;     
  owner: Owner;
  partnership:Partnership;
  branch : Branch;    
  client : Client;
  clientAccount: ClientAccounts;
  person: Person;
  persons: Person;
  company: Company;
  address: ContactInfo;
  stringifiedData: any;  
  param: any;
  parsedJson: any;  
  
  constructor(private formDataService :ProfileFormDataService, 
    public service:OrganizationService) { 
    this.organization = formDataService.organization;
    this.department = formDataService.department;      
    this.factory = formDataService.factory;  
    this.warehouse = formDataService.warehouse;     
    this.owner = formDataService.owner;
    this.partnership = formDataService.partnership;
    this.branch = formDataService.branch;    
    this.client = formDataService.client;
    this.clientAccount = formDataService.clientAccount;
    this.person = formDataService.person;
    this.company = formDataService.company;
    this.address = formDataService.address;    
  }

  ngOnInit() {
    console.log(this.formDataService.organization);
    console.log(this.formDataService.department);
    console.log(this.formDataService.branch);
    console.log(this.formDataService.warehouse);
    
    this.stringifiedData = JSON.stringify(this.formDataService.organization);  
    console.log("With Stringify :" , this.stringifiedData);
    this.parsedJson = JSON.parse(this.stringifiedData);  
    console.log("With Parsed JSON :" , this.parsedJson);
    /*console.log(this.formDataService.owner);
    console.log(this.formDataService.partnership);
    console.log(this.formDataService.client);
    console.log(this.formDataService.clientAccount);
    console.log(this.formDataService.person);
    console.log(this.formDataService.address);*/
}

onSubmit() {
  //this.model = value;
  //this.submitted = true;
  this.param = {'organization': this.formDataService.organization,
                'branch':this.formDataService.branch,
                'department':this.formDataService.department,
                'warehouse':this.formDataService.warehouse,            
              };
  
  this.service.setupBusiness(this.param)                    
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

}

goBack(){

}
onFormSubmit() {
 /* this.param = {'purchaseorder': this.purchaseOrder, 
                'orderdetails': this.orderDetails,
                'salescontract': this.salesContract};
 
  let body = JSON.stringify(this.param);
  
  this.service.addPurchaseOrder(this.param)                    
              .subscribe(
                (val) => {
                    alert("New Purchase Request successfuly created.")
                    console.log("POST call successful value returned in body", 
                                val);
                  this.invoice = val;
                  this.service.changeMessage(this.invoice);
                  // this.invoicePdf(val); 
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
                });
*/
  }

}
