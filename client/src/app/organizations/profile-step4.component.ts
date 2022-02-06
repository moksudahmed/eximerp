import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService  } from '../services/organization.service';
import { Organization, Branch, Department, Factory, Warehouse, Partners} from './organization';
import { Observable } from 'rxjs/Observable';
import { PurchaseOrder, SalesContract } from '../purchase/purchase';
import { Order} from '../sales/sales';
import { PurchaseService } from '../services/purchase.service';
import { SalesService } from '../services/sales.service';
import { Client, Owner, Partnership } from '../clients/client';
import { ClientService  } from '../services/client.service';

import { TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProfileFormDataService  } from '../services/profileformdata.service';
import { isEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-profile-step4',
  templateUrl: './profile-step4.component.html',
  styleUrls: ['./profile-step4.component.scss']
})

export class ProfileStep4Component implements OnInit {
  
  private department :Department;      
  private factory : Factory;     
  private warehouse : Warehouse;     
  private partnerships: Partnership[] = [];
  private branches: Branch[] = [];
  private departments: Department[] = [];
  private factories : Factory[]=[];     
  private warehouses : Warehouse[]=[];     
 
//  private organization : Observable<Organization[]>;  
 
  private partnership:Partnership;
  private branch : Branch;    

  modalRef: BsModalRef;

  param: any;

  model : Organization;
  id: string;
  constructor(public route:ActivatedRoute, 
              public router:Router, 
              public service:OrganizationService,
              public pservice:PurchaseService,
              public sservice:SalesService,
              public cservice:ClientService,
              private modalService: BsModalService,
              private formDataService:ProfileFormDataService) 
              {
                this.partnership = formDataService.partnership;
                this.branch = formDataService.branch;
                this.department = formDataService.department;
                this.factory = formDataService.factory;
                this.warehouse = formDataService.warehouse;
              }

  ngOnInit() {
   
}

openModal(template: TemplateRef<any>) {
  
  this.modalRef = this.modalService.show(template);
}


onFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
   
   
  this.param = {'owner':this.partnership};
  this.partnerships.push(this.partnership); 
  let body = JSON.stringify(this.param);
  console.log('Param',this.param);
 /* this.cservice.addPartnership(this.param)                    
              .subscribe(
                (val) => {
                    alert("Record saved sucessfully!");
                    this.modalRef.hide()
                    this.getPartners(this.partnership.organizationID);
                },
                response => {
                    alert("Already exist!");                    
                },
                () => {
                  // alert("The POST observable is now completed.");                   
                });
  */
      this.goBack();
      this.formDataService.postData();
}
onBranchFormSubmit({ value, valid}: { value: Branch, valid: boolean }) {
  this.branch = value;
  this.branches.push(this.branch); 
  this.formDataService.postData();
  this.branch = new Branch();

}
onDepartmentFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
  if(this.branches.length == 0){
    alert("You are required to create a branch first!");
  }
  else{
    this.departments.push(this.department);
    this.formDataService.postData();
  
  }
 
}
onWarehouseFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
    if(this.branches.length == 0){
        alert("You are required to create a branch first!");
    }
    else{
      this.warehouses.push(this.warehouse);
      this.formDataService.postData(); 
    }
  
}
onFactoryFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
  this.factories.push(this.factory);
  this.formDataService.postData(); 
}
goBack(){
 /* this.partnership = new Partnership();
  this.branch = new Branch();
  this.department = new Department();
  this.factory = new Factory();
  this.warehouse = new Warehouse();*/
 }
}
