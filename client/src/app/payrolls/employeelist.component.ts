import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee,VWEmployee, Person, Client, Address, AcademicHistory, EmploymentHistory, SalaryProfile } from './employee';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  private employee : Observable<VWEmployee[]>;    
  private employees: VWEmployee[];

  private person : Observable<Person[]>;    
  private persons: Person[];

  constructor(
    public eservice:EmployeeService,
    public pservice:PersonService

  ) { }

  ngOnInit() {
    this.getEmployees();
    this.getPersons();
    this.getSalaryProfile();
  }

 // employees:Employee;
//  persons: Person;
  salaryProfile: SalaryProfile;

  getEmployees(): void {
    this.eservice.getEmployeesRecord().subscribe(employee => {
      this.employees = employee['employees']; 
    });
   
  }
  
  getPersons(): void {
    this.pservice.getPersons().subscribe(person => {
      this.persons = person['persons']; 
    });
   
  }
  /*_getEmployees(){
      this.eservice.getEmployees()
      .subscribe(employees =>{
        console.log(employees);
        this.employees = employees;
      })
  }*/
  deleteEmployee(id){
      this.eservice.deleteEmployee(id)
      .subscribe(()=>{
        this.getEmployees();
      })
    
  }
  /*getPerson(){
    this.pservice.getPerson()
    .subscribe(persons =>{
      console.log(persons);
      this.persons = persons;
    })
  }*/
  getSalaryProfile(){
    this.eservice.getAllSalaryProfile()
    .subscribe(salaryProfile =>{
      console.log(salaryProfile);
      this.salaryProfile = salaryProfile;
    })
  }
  
}

