import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Employee, Person, Client, Address, AcademicHistory, EmploymentHistory, SalaryProfile, Monthly } from './employee';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PayrollsRoutingModule } from './payrolls-routing.module';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
export class Options {
  constructor(public id: number, public name: string) { }
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
 
export class EmployeeComponent implements OnInit {  
  thenBlock: TemplateRef<any>|null = null;
  show: boolean = true;

  @ViewChild('primaryBlock')
  primaryBlock: TemplateRef<any>|null = null;
  @ViewChild('secondaryBlock')
  secondaryBlock: TemplateRef<any>|null = null;


  private employee: Employee;
  private person: Person;
  private client: Client;
  private address: Address;
  private monthly: Monthly;
  param: any;
  titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];
  employeeType = ['Hourly', 'Commissioned', 'Monthly'];
  settings: any;
  epmsettings: any;
  
  delflag=false;
  data = [];
  
  edata = [];

  private academicHistory: AcademicHistory[] = [];
  private employmentHistory: EmploymentHistory[] = [];
  private salaryProfile: SalaryProfile;

  selectedOption:Options = new Options(3, 'Monthly');
  options = [
     new Options(1, 'Hourly' ),
     new Options(2, 'Commissioned' ),
     new Options(3, 'Monthly' )     
  ];
  
  constructor(
    public eservice:EmployeeService,
    public pservice:PersonService
  ) {
    this.client = new Client();
    
   }

  ngOnInit() {

        this.person = new Person();
        this.employee = new Employee();
       
        this.address = new Address();
        this.salaryProfile = new SalaryProfile();
        this.monthly = new Monthly();        
        this.thenBlock = this.primaryBlock; 
        this.client.organizationID = 1;
        this.client.clientType ='employee';
        this.client.date = new Date();
  }
  switchPrimar(optionid) {
    this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
    this.thenBlock = this.thenBlock === this.primaryBlock ? this.secondaryBlock : this.primaryBlock;
    
}
  addEmployee(){      

        this.eservice.addEmoloyee(this.employee)
          .subscribe(()=> this.goBack())

  }

  onFormSubmit({ value, valid}: { value: Person, value1: Address,value2: Employee, value3: SalaryProfile,  valid: boolean }) {    

      //  this.person = value; 
        //this.address = value1;              
        console.log(this.person);
        this.salaryProfile.paymentType = this.selectedOption.name;
        if(this.selectedOption.name == 'Monthly'){
          this.salaryProfile.commissionRate = 0;
          this.salaryProfile.hourlyRate = 0;
          this.param = {'client':this.client,'person': this.person, 'address': this.address, 'employee': this.employee, 'salaryProfile': this.salaryProfile, 'monthly': this.monthly };
        }
        else if ( this.selectedOption.name == 'Hourly'){
          this.salaryProfile.commissionRate = 0;
          this.param = {'client':this.client,'person': this.person, 'address': this.address, 'employee': this.employee, 'salaryProfile': this.salaryProfile };
        }
          else if ( this.selectedOption.name == 'Commissioned')  { 
          this.salaryProfile.hourlyRate = 0;
          this.param = {'client':this.client,'person': this.person, 'address': this.address, 'employee': this.employee, 'salaryProfile': this.salaryProfile };
        }
        let body = JSON.stringify(this.param);
        console.log(this.param);        
        this.eservice.addEmployee(this.param)                    
                    .subscribe(
                      (val) => {
                          console.log("POST call successful value returned in body", val);
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
 //   this.router.navigate(['/home']);

}
addAcademicHistory(){
    this.settings = {
      defaultStyle: false,
      attr: {
      class: 'table table-bordered table-striped' // this is custom table scss or css class for table
      },
          add: {
            addButtonContent: '<i class="fa fa-plus-square-o" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check-square"></i>',
            cancelButtonContent: '<i class="fa fa-minus-square"></i>',
            confirmCreate:true
        },
        /*add:{
            confirmCreate:true
           },*/
           edit: {
            editButtonContent: '<i class="fa fa-pencil"></i>',
            saveButtonContent: '<i class="fa fa-check-square"></i>',
            cancelButtonContent: '<i class="fa fa-minus-square"></i>'
            
            //mode: 'external'
          },
            delete :{
              deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
              confirmDelete: true
            },
                 
      columns: {      
   
        debitCredit: {
          title: 'degreeName',
          type: 'html',
          filter: false,
          editor: {
            type: 'list',
            config: {
              list: [{ value: 'hons', title: 'Honours' }, { value: 'masters', title: 'Masters' }]
            }
          }
        },    
       
       institutionName: {
          title: 'InstitutionName',
          filter: false,
        },
        awardingBody: {
            title: 'Awarding Body',
            filter: false,
          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
          passingYear: {
            title: 'Year',
            type: 'html',
            filter: false,         
            valuePrepareFunction: (cell, row) => { return Number(row.amount)    
              },            
          },
          result: {
            title: 'Result',
            filter: false,
          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
            
      }
    };
  }
  addEmploymentHistory(){
    this.epmsettings = {
      defaultStyle: false,
      attr: {
      class: 'table table-bordered table-striped' // this is custom table scss or css class for table
      },
          add: {
            addButtonContent: '<i class="fa fa-plus-square-o" aria-hidden="true"></i>',
            createButtonContent: '<i class="fa fa-check-square"></i>',
            cancelButtonContent: '<i class="fa fa-minus-square"></i>',
            confirmCreate:true
        },
        /*add:{
            confirmCreate:true
           },*/
           edit: {
            editButtonContent: '<i class="fa fa-pencil"></i>',
            saveButtonContent: '<i class="fa fa-check-square"></i>',
            cancelButtonContent: '<i class="fa fa-minus-square"></i>'
            
            //mode: 'external'
          },
            delete :{
              deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
              confirmDelete: true
            },
                 
      columns: {      
        designation: {
          title: 'Designation',
          filter: false,
        },
        organizationName: {
            title: 'organizationName',
            filter: false,          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
          address: {
            title: 'address',
            filter: false,          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
          joiningDate: {
            title: 'joiningDate',
            filter: false,          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
          leavingDate: {
            title: 'leavingDate',
            filter: false,          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
            
      }
    };
  }
 
  addData(event){
    if(this.delflag){
      this.data.push(event.newData);
      //console.log(event.newData);
    }
    // console.log(event);
    event.confirm.resolve(event.newData);
  }
  addEmploymentData(event){
    if(this.delflag){
      this.edata.push(event.newData);
      //console.log(event.newData);
    }
    // console.log(event);
    event.confirm.resolve(event.newData);
  }
  
  modifyData(event){
    this.delflag=true;
    // console.log(this.data);
    let delrow=Object.keys(event.data);
    for(var j in this.data)
    {
      // console.log(this.data,event.data);
    if(this.data[j]==event.data)
      {
        this.data.splice(1,1);
        // this.data=event.source.data;
      }
    }
    event.confirm.resolve(event.source.data);
    
    // console.log(this.data)
    if(this.data.length==0)
      {this.data=[];
        this.delflag=false;
      }
  }
}
