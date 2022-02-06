import { Component, OnInit } from '@angular/core';
import { Person, Client, ContactInfo, Company, ClientAccounts } from './client';
import { ClientService  } from '../services/client.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
 // styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent implements OnInit {
  
  clientType = ['customer','supplier','agent','dealer']; 
  category = ['individual','corporate'];
 
  private client : Client;
  private clientAccount: ClientAccounts;
  private person: Person;
  private company: Company;
  private address: ContactInfo;
  profileType : boolean;
  submitted = false;
  param: any;

  constructor(public service:ClientService
  ) { 
      this.client = new Client();
      this.clientAccount = new ClientAccounts();
      this.person = new Person();
      this.company = new Company();     
      this.address = new ContactInfo();
      this.profileType = true;
  }

  ngOnInit() {    
  }

onChange(value){    
    this.profileType = value;   
    console.log(this.profileType); 
}
  onFormSubmit({ value, valid}: { value: Client, valid: boolean }) {
    //this.client = value;
    console.log(this.client);
    if(this.profileType === true){

     this.param = {'client': this.client,'clientAccount': this.clientAccount, 'person': this.person,'address':this.address};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.service.addClient(this.param)                    
                .subscribe(
                  (val) => {
                    alert("Successful created")
                      //console.log("POST call successful value returned in body", 
                        //          val);
                  },
                  response => {
                    alert("POST call in error"+ response);
                      //console.log("POST call in error", response);
                  },
                  () => {
                      console.log("The POST observable is now completed.");
                  });
    
      this.goBack();
    }
    else{     
      this.param = {'client': this.client,'clientAccount': this.clientAccount, 'company':this.company,'address':this.address};
      let body = JSON.stringify(this.param);
      console.log(this.param);
      this.service.addCorporateClient(this.param)                    
                  .subscribe(
                    (val) => {
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
  //  console.log("valid: " + valid);
   /* this.service.addClient(this.client)                
    .subscribe(()=> this.goBack())*/
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
