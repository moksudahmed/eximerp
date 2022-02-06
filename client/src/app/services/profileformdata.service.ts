import { Organization, Branch, Department, Factory, Warehouse} from '../organizations/organization';
import { Person, Client, Owner, Partnership,ContactInfo, Company, ClientAccounts } from '../clients/client';


export class ProfileFormDataService{
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
   

    constructor() {

        this.organization = new Organization();
        this.department = new Department();      
        this.factory = new  Factory();  
        this.warehouse = new  Warehouse();     
        this.owner = new  Owner();
        this.partnership = new Partnership();
        this.branch = new  Branch();    
        this.client = new  Client();
        this.clientAccount = new  ClientAccounts();
        this.person = new  Person();
        this.company = new Company();
        this.address = new ContactInfo();
     }
  
     postData(){
       let newCombinedObject = {
         organization : this.organization, 
         department   : this.department,
         factory      : this.factory,
         warehouse    : this.warehouse,
         owner        : this.owner,
         partnership  : this.partnership,
         branch       : this.branch,
         client       : this.client,
         clientAccount: this.clientAccount,
         person       : this.person,
         company       : this.company, 
         address       : this.address,
       }
     
       //Use somthing like http.post etc to send the data to the backend server. 
     }
  }