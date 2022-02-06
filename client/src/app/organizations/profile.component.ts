import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService  } from '../services/organization.service';
import { Organization, Profile, Branch, Department, Factory, Warehouse, Partners} from './organization';
import { Observable } from 'rxjs/Observable';
import { PurchaseRequest,  PurchaseOrder, SalesContract, PurchaseOrderDetails, PurchaseRequestCart, LC, Local, Qutation, Supplier } from '../purchase/purchase';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from '../sales/sales';
import { PurchaseService } from '../services/purchase.service';
import { SalesService } from '../services/sales.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Person, Client, Owner, Partnership, ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ClientService  } from '../services/client.service';

import { TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  private organization : Observable<Organization[]>;  
  private orgns : Observable<Organization[]>;  
 
  private branch : Observable<Branch[]>;    
  private department : Observable<Department[]>;      
  private factory : Observable<Factory[]>;     
  private warehouse : Observable<Warehouse[]>;     
  private orders : Observable<PurchaseOrder[]>;  
  private contracts: Observable<SalesContract[]>;
  private partner: Observable<Partners[]>;
  private sales: Observable<Order[]>;
  
//  private organization : Observable<Organization[]>;  
 
  private owner: Owner;
  private partnership:Partnership;

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
              private modalService: BsModalService) {
                this.partnership = new Partnership();
                }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.service.getOrganizationById(params.get('id')).subscribe(organization => {
        this.model = organization['organization'];
        this.getBranches(params.get('id'));
        this.getDepartments(params.get('id'));
        this.getFactory(params.get('id'));
        this.getPartners(params.get('id'));
        this.getPurchaseOrder(params.get('id'));
        this.getSalesOrder(params.get('id'));
      });
    });  
    this.getOrganization();
    this.getOwners();
    this.getSalesContract();
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}


onFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
   
   
  this.param = {'owner':this.partnership};
 
  let body = JSON.stringify(this.param);
  console.log('Param',this.param);
  this.cservice.addPartnership(this.param)                    
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
  
   //   this.goBack();

}

 getBranches(id): void {    
    this.service.getBranchesByOrganizations(id).subscribe(branches => {
      this.branch = branches['branch'];
      console.log(this.branch);  
    });
  }

  getOrganization(){
    this.service.getOrganization().subscribe(organizations => {
     this.orgns = organizations['organizations'];
     console.log(this.organization);
   });
   }

   getOwners(){
    this.cservice.getOwners().subscribe(organizations => {
     this.owner = organizations['owners'];
     console.log(this.owner);
   });
   }

 getDepartments(id): void {    
  this.service.getDepartmentsByOrganizations(id).subscribe(departments => {
    this.department = departments['department'];
    console.log(this.department);  
  });
}



getFactory(id): void {    
  this.service.getFactoryByOrganizations(id).subscribe(factories => {
    this.factory = factories['factory'];
    console.log(this.factory);  
  });
}

getPartners(id): void {    
  this.service.getPartnersByOrganizations(id).subscribe(partners => {
    this.partner = partners['partners'];
    console.log(this.partner);  
  });
}

getPurchaseOrder(id): void {
  this.pservice.getPurchaseOrderByOrganizations(id).subscribe(model => {
  this.orders = model['orders']});
}

getSalesOrder(id): void {
  this.sservice.getOrderByOrganizations(id).subscribe(model => {
  this.sales = model['orders']});
}


getSalesContract(): void {

  this.pservice.getSalesContract().subscribe(contract => {
  this.contracts = contract['result']; 

});
}
}
