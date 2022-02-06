import { Component, OnInit } from '@angular/core';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  //private organization: Organization;
 // private branch : Observable<Branch[]>;  
  private branch : Branch;  
  private department: Department;
  private factory : Observable<Factory[]>;  
  private warehouse: Warehouse;
  submitted = false;
  param: any;
  private organization : Observable<Organization[]>;
  
  constructor(public service:OrganizationService) {

    //this.organization = new Organization();
    this.branch = new Branch();
    this.department = new Department();
   
    this.warehouse = new Warehouse();

   }

  ngOnInit() {
    this.getOrganization();    
  }

  getOrganization():void{
    this.service.getOrganization().subscribe(organizations => {
     this.organization = organizations['organizations'];
     console.log(this.organization);
   });
   }
  
   
   onFormSubmit({ value, valid}: { value: Branch, valid: boolean }) {
    
     this.param = {'branch': this.branch};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.service.addBranch(this.param)                    
                .subscribe(
                  (val) => {
                      alert("New Branch successfuly created.")
                     
                  },
                  response => {
                      console.log("POST call in error", response);
                  },
                  () => {
                      console.log("The POST observable is now completed.");
                  });
    
      this.goBack();
    
    
  //  console.log("valid: " + valid);
   /* this.service.addClient(this.client)                
    .subscribe(()=> this.goBack())*/
  }
  
  goBack(){    
    
   }
 

getBranch(){
  //this.branch = this.service.getBranch();
  
}
  getFactory(){
    this.factory = this.service.getFactory();
    
  }

}
