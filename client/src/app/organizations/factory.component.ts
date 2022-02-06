import { Component, OnInit } from '@angular/core';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  //styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {
  private organization: Organization;
  private department: Department;
  private factory: Factory;
  private warehouse: Warehouse;

  private _organization : Observable<Organization[]>;
  private branch : Observable<Branch[]>;    
  
  submitted = false;
  param: any;

  constructor(public service:OrganizationService) {

    this.organization = new Organization();
    this.department = new Department();
    this.factory = new  Factory();
    this.warehouse = new Warehouse();

   }

  ngOnInit() {
    this.getOrganization();
  }

  
  getOrganization():void{
    this.service.getOrganization().subscribe(organizations => {
     this._organization = organizations['organizations'];
     console.log(this.organization);
   });
   }
  
  
 onOptionsSelected(event){
  console.log(event);
   this.getBranches(event);
 }

 getBranches(id): void {    
   this.service.getBranchesByOrganizations(id).subscribe(branches => {
     this.branch = branches['branch'];
     console.log(this.branch);  
   });
 }


 onFormSubmit({ value, valid}: { value: Factory, valid: boolean }) {
    
  this.param = {'factory': this.factory};

 let body = JSON.stringify(this.param);
 console.log(this.param);
 this.service.addFactory(this.param)                    
             .subscribe(
               (val) => {
                   alert("New Factory successfuly created.")
                  
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

}
