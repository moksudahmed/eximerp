import { Component, OnInit } from '@angular/core';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  //styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  private organization: Organization;
  private branch: Branch;
  private department: Department;
  private factory : Observable<Factory[]>;     
   private model: Warehouse;
  submitted = false;
  param: any;

  constructor(public service:OrganizationService) {

    this.organization = new Organization();
    this.branch = new Branch();
    this.department = new Department();
    this.model = new Warehouse();

   }

  ngOnInit() {
    this.getFactory();
  }

  getFactory(){
    this.service.getFactories().subscribe(factories => {
     this.factory = factories['factories'];
     });
  }

  onFormSubmit({ value, valid}: { value: Warehouse, valid: boolean }) {
    //this.client = value;
    console.log(this.model);
    
     this.param = {'warehouse': this.model};
   
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.service.addWarehouse(this.param)                    
                .subscribe(
                  (val) => {
                      alert("New Warehouse successfuly created.")
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
    
    
  //  console.log("valid: " + valid);
   /* this.service.addClient(this.client)                
    .subscribe(()=> this.goBack())*/
  }
  
  goBack(){    
    
   }

}
