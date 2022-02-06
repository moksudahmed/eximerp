import { Component, OnInit } from '@angular/core';
import { Person, Client, Owner, Partnership, ContactInfo, Company, ClientAccounts } from '../clients/client';
import { ClientService  } from '../services/client.service';
import { Organization } from './organization';
import { OrganizationService  } from '../services/organization.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {
  
  private organization : Observable<Organization[]>;  
 
  private owner: Owner;
  private partnership:Partnership;

  submitted = false;
  param: any;

  constructor(public oservice:OrganizationService,public service:ClientService,
    public route:ActivatedRoute,
    public router:Router) { 
      this.owner = new Owner();
      this.partnership = new Partnership();
  }

  ngOnInit() {
    this.getOrganization();
    this.getOwners();
    
  }
  onChange(value){    
    console.log(value);
    alert(value);
  }

  onFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
   
   
    this.param = {'owner':this.partnership};
   
    let body = JSON.stringify(this.param);
 //   console.log('Param',this.param);
    this.service.addPartnership(this.param)                    
                .subscribe(
                  (val) => {
                    alert("Record saved sucessfully!");
                      //console.log("Record saved sucessfully!",val);
                  },
                  response => {
                    alert("POST call in error " + response);
                      //console.log("POST call in error", response);
                  },
                  () => {
                      console.log("The POST observable is now completed.");
                  });
    
 //     this.goBack();
        this.goBack();
      
  }
  getOrganization(){
    this.oservice.getOrganization().subscribe(organizations => {
     this.organization = organizations['organizations'];
     console.log(this.organization);
   });
   }

   getOwners(){
    this.service.getOwners().subscribe(organizations => {
     this.owner = organizations['owners'];
     console.log(this.owner);
   });
   }

  goBack(){    
    
   }
   onSubmit() { this.submitted = true; }
   
     // TODO: Remove this when we're done
     get diagnostic() { return JSON.stringify(this.partnership); }
   
     newClient() {
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



