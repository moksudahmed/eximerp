import { Component, OnInit } from '@angular/core';
import { Person, Client, Owner, ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ClientService  } from '../services/client.service';
import { Organization } from './organization';
import { OrganizationService  } from '../services/organization.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.scss']
})
export class CreatePartnerComponent implements OnInit {
  
  private organization : Observable<Organization[]>;  
 
  clientType = ['owner','director','share-holder','partner']; 
  category = ['individual','corporate'];
 
  private client : Client;
  private clientAccount: ClientAccounts;
  private person: Person;
  private owner: Owner;
  private company: Company;
  private address: ContactInfo;
  profileType : boolean;
  submitted = false;
  param: any;

  constructor(public oservice:OrganizationService,public service:ClientService,
    public route:ActivatedRoute,
    public router:Router) { 
      this.client = new Client();
      this.clientAccount = new ClientAccounts();
      this.person = new Person();
      this.company = new Company();     
      this.address = new ContactInfo();
      this.owner = new Owner();
      this.profileType = true;
  }

  ngOnInit() {
    this.getOrganization();
    this.client.date = new Date();    
    this.profileType = true;
    
  }
  onChange(value){    
    this.profileType = value;   
    console.log(this.profileType); 
 }

  onFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
   
    if(this.profileType === true){
   
    this.param = {'client': this.client,'owner':this.owner, 'person': this.person,'contactinfo':this.address};
   
    let body = JSON.stringify(this.param);
    console.log('Param',this.param);
    this.service.addClient(this.param)                    
                .subscribe(
                  (val) => {
                    alert("Record saved sucessfully!");
                      //console.log("Record saved sucessfully!",val);
                  },
                  response => {
                    alert("POST call in error ");
                      console.log("POST call in error", response);
                  },
                  () => {
                      console.log("The POST observable is now completed.");
                  });
    
      this.goBack();
    }
    else{     
      this.param = {'client': this.client,'owner':this.owner, 'company':this.company,'contactinfo':this.address};
   
   //   this.param = {'client': this.client,'clientAccount': this.clientAccount, 'company':this.company,'address':this.address};
   
      let body = JSON.stringify(this.param);
      console.log('Param',this.company);
      this.service.addCorporateOwner(this.param)                    
                  .subscribe(
                    (val) => {
                        console.log("Record saved sucessfully!",val);
                    },
                    response => {
                        console.log("POST call in error", response);
                    },
                    () => {
                        console.log("The POST observable is now completed.");
                    });
      
        this.goBack();
      
    }
  }
  getOrganization(){
    this.oservice.getOrganization().subscribe(organizations => {
     this.organization = organizations['organizations'];
     console.log(this.organization);
   });
   }

  goBack(){    
    
   }
   onSubmit() { this.submitted = true; }
   
     // TODO: Remove this when we're done
     get diagnostic() { return JSON.stringify(this.client); }
   
     newClient() {
      this.client = new Client();
      this.clientAccount = new ClientAccounts();
      this.person = new Person();
      this.owner = new Owner();
      this.company = new Company();
      this.client.subSidiaryAccountID = 1;
      this.clientAccount.active = true;
      this.clientAccount.suspended = false;
      this.profileType = true;
      this.client.date = new Date();
      this.clientAccount.joiningDate = new Date();
      this.client.organizationID = 1;
     }
   
     skyDog(): Client {
       let client =  new Client();
       console.log('My hero is called ' + client.clientType); // "My hero is called SkyDog"
       return client;
     }
   
     //////// NOT SHOWN IN DOCS ////////
   
     // Reveal in html:
     //   Name via form.controls = {{showFormControls(heroForm)}}
     showFormControls(form: any) {
       return form && form.controls['name'] &&
       form.controls['name'].value; // Dr. IQ
     }
   
     /////////////////////////////
 
}

