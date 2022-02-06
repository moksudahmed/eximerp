import { Component, OnInit } from '@angular/core';
import { Employee, Person, Client, Address, AcademicHistory, EmploymentHistory, SalaryProfile, Monthly } from './employee';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChartOfAccount } from '../accountings/accounting';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
 // styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

  person: Person;
  client: Client;
  address: Address;
 private monthly: Monthly;
  employee:Employee;
  salaryProfile: SalaryProfile;
  private accounts: ChartOfAccount;
  constructor(
    public eservice:EmployeeService,
    public pservice:PersonService,
    public route:ActivatedRoute,
    public router:Router,
    public accountsService:ChartofaccountsService
  ) { 
    this.salaryProfile = new SalaryProfile();  
    this.accounts = new ChartOfAccount(); 
    this.monthly = new Monthly();
    this.getMonthly(); 
    this.getAccounts();
      
    }
 
  ngOnInit() 
  {      
    
    this.getEmployee();  
    this.getPerson();
    this.getSalaryProfile(); 
    
 }
 getAccounts(){    
  /*this.accountsService.getAccounts()
   .subscribe(accounts =>{         
     this.accounts = accounts;
   })*/
   
}
  getEmployee()
  {
      var id = this.route.snapshot.params['id'];
      this.eservice.getEmployee(id)
      .subscribe(employee=>{
        this.employee = employee;
      })
      console.log(this.employee);
  }

  getPerson(){
    var id = this.route.snapshot.params['id'];
    this.pservice.getPerson(id)
    .subscribe(person=>{
      this.person = person;
    })
    console.log(this.person);
  }
 getSalaryProfile(){
    var id = this.route.snapshot.params['id'];
    this.eservice.getSalaryProfile(id)
    .subscribe(salaryProfile=>{
      this.salaryProfile = salaryProfile;
    })
    console.log(this.salaryProfile);
  }
  getMonthly(){    
    this.eservice.getMonthlySalary()
     .subscribe(monthly =>{
          this.monthly = monthly
   })
     console.log(this.monthly);
 }
  getMonthlySalary(id:number){          
    for(var i =0; i< Object.keys(this.monthly).length; i++){        
        if(this.monthly[i].monthlyID === id)           
              return this.monthly[i];      
    }       
    return 0;
  }  
  goBack(){
    this.router.navigate(['/payrolls/employeelist']);
  }
}
