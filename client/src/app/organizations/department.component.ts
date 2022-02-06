import { Component, OnInit } from '@angular/core';
import { Organization, Department, Branch } from './organization';
import { OrganizationService  } from '../services/organization.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
 // styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  private organization: Organization;

  private _organization : Observable<Organization[]>;
  private branch : Observable<Branch[]>;    
  
 
  private model: Department;
  
  submitted = false;
  param: any;

  constructor(public service:OrganizationService) {

    this.organization = new Organization();
    this.model = new Department();
    

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
  
   
   onFormSubmit({ value, valid}: { value: Department, valid: boolean }) {
    
    this.param = {'department': this.model};
  
   let body = JSON.stringify(this.param);
   console.log(this.param);
   this.service.addDepartment(this.param)                    
               .subscribe(
                 (val) => {
                     alert("New Department successfuly created.")
                    
                 },
                 response => {
                     console.log("POST call in error", response);
                 },
                 () => {
                     console.log("The POST observable is now completed.");
                 });
   
     this.goBack();
   
   
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

  goBack(){    
    
   }

}

