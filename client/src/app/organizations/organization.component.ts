import { Component, OnInit } from '@angular/core';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {
  private organization : Observable<Organization[]>;  
  private branch : Observable<Branch[]>;    
  private department : Observable<Department[]>;      
  private factory : Observable<Factory[]>;     
  private warehouse : Observable<Warehouse[]>;     
  todo$: Observable<Branch[]>;
   selectedOrganization: Organization;
   selectedBranch: Branch;
   selectedDepartment: Department;
   selectedFactory: Factory;
   selectedWarehouse: Warehouse;
  private branches: Branch[];
  selectedId: number;
  branchName: string;
  constructor(public service:OrganizationService,
              public route:ActivatedRoute,
              public router:Router) {

                if (localStorage.getItem('branchName')) {

                  this.branchName = localStorage.getItem('branchName');
                }
            //    console.log(this.branch);
            
   }

  ngOnInit() {
  //  this.getOrganization();
    this.getBranches();
    this.getDepartment();
    this.getFactory();
    this.getWarehouse();
    
  }
  getOrganization(){
   this.service.getOrganization().subscribe(organizations => {
    this.organization = organizations['organizations'];
    console.log(this.organization);
  });
  }


  getBranches(): void {    
    this.service.getBranches().subscribe(branches => {
      this.branch = branches['branches'];
      console.log(this.branch);  
    });
  }

onSelectBranch(branch: Branch): void {    
  this.selectedBranch = branch;  
}

onSelectFactory(obj: Factory): void {    
  this.selectedFactory = obj;  
}

onSelectWarehouse(obj: Warehouse): void {    
    this.selectedWarehouse = obj;  
}

onSelectDepartment(obj: Department): void {    
    this.selectedDepartment = obj;  
}
  getFactory(){
    // this.department = this.service.getDepartment();    
    this.service.getFactories().subscribe(factories => {
     this.factory = factories['factories'];
    // console.log(this.branch);  
   });
     }

 /* getFactory(){
    this.factory = this.service.getFactory();
  }

  getWarehouse(){
    this.warehouse =  this.service.getWarehouse();
  }*/

  
  getWarehouse(){
    // this.department = this.service.getDepartment();    
    this.service.getWarehouse().subscribe(warehouses => {
     this.warehouse = warehouses['warehouses'];
    // console.log(this.branch);  
   });
 }
  getDepartment(){
   // this.department = this.service.getDepartment();    
   this.service.getDepartments().subscribe(departments => {
    this.department = departments['departments'];
   // console.log(this.branch);  
  });
    }
}

