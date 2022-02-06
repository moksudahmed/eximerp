import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { Employee, Person, Client, Address, AcademicHistory, EmploymentHistory, SalaryProfile } from '../payrolls/employee';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';

export interface Employees{
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  emailAddress: string;
  mobileNo: string;
  maritalStatus: string;
  employeeID: number;  
  designation: string;
  status: string;	
}
@Component({
  selector: 'app-branchdetails',
  templateUrl: './branchdetails.component.html',
  styleUrls: ['./branchdetails.component.scss']
})
export class BranchdetailsComponent implements OnInit {
  branch : Branch;
  employee:Employee;
  employees:Employee;
  person: Person;
  model: Employees;
  constructor(public service:OrganizationService,
              public eservice:EmployeeService,
              public pservice:PersonService,
              public route:ActivatedRoute,
              public router:Router) { 
                this.branch = new Branch();
                this.person = new Person();
              } 

  ngOnInit() {
      this.getBrnch();
      this.getEmployees();
    //  this.getEmployee();  
    
     }
  getBrnch(){
    var id = this.route.snapshot.params['id'];
    this.service.getBranchById(id)
    .subscribe(branch=>{
      console.log(branch)
      this.branch = branch;
    })
    
  }
  getEmployee()
  {
    var id = this.route.snapshot.params['id'];
     // var id = this.branch.employeeID;
      this.eservice.getEmployee(id)
      .subscribe(employee=>{
        this.employee = employee;
      })
      console.log(this.employee);
  }
  getEmployees(){
    var id = this.route.snapshot.params['id'];
    this.service.getBranchEmployees(id)
    .subscribe(model =>{
      console.log(model);
      this.model = model;
    })
}
  getPerson(id){
   // var id = this.branch.employeeID;
  //alert(id);
    this.pservice.getPerson(id)
    .subscribe(person=>{
      this.person = person;
    })
  //  console.log(this.person);
  }
  goBack(){
    this.router.navigate(['/organizations/organization']);
  }
}
