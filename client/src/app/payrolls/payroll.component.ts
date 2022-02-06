import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PayrollService  } from '../services/payroll.service';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { Employee, Person } from './employee';
import { HourlySalary, MonthlySalary, Payroll, CommissionSalary, Wages } from './payroll';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';

export class Options {
  constructor(public id: number, public name: string) { }
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
 // styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  thenBlock: TemplateRef<any>|null = null;
  show: boolean = true;

  @ViewChild('primaryBlock')
  primaryBlock: TemplateRef<any>|null = null;
  @ViewChild('secondaryBlock')
  secondaryBlock: TemplateRef<any>|null = null;
  
  data = [];
  hdata = [];
  cdata = [];
  
  delflag=false;
  settings: any;
  hsettings: any;
  csettings: any;

  grossSalary = 0;

  private payroll: Payroll;
  private employee: Employee;
  private monthly:MonthlySalary;
  private person: Person;  
  private hourly: HourlySalary;
  private commssion: CommissionSalary;
  private wages: Wages[] = [];
  private _wages: Wages;

  param: any;
  selectedOption:Options = new Options(3, 'Monthly');
  options = [
    new Options(1, 'Hourly' ),
    new Options(2, 'Commissioned' ),
    new Options(3, 'Monthly' )     
 ];
  
  constructor( public service:PayrollService, 
     public eservice:EmployeeService,
    public pservice:PersonService) {    
  }

  ngOnInit() {
    this.payroll = new Payroll();
    this.employee = new Employee();   
 
    this.getSalaryProfile('Hourly');
    this.getMonthlySalaryProfile();    
    this.getCommissiondSalary('Commissioned');
    this.thenBlock = this.primaryBlock; 
  }
  addPayroll(){          
            this.service.addPayroll(this.payroll)
              .subscribe(()=> this.goBack())    
      }

  switchPrimar(optionid) {
      this.selectedOption = this.options.filter((item)=> item.id == optionid)[0];
      this.thenBlock = this.thenBlock === this.primaryBlock ? this.secondaryBlock : this.primaryBlock;
      if( this.selectedOption.name == 'Monthly'){
            this.addSalaryprofile();
      }
      else if ( this.selectedOption.name == 'Hourly'){
            this.addCommissionSalaryprofile();
      }
      else if ( this.selectedOption.name == 'Commissioned')  { 
            this.addHourlySalaryprofile();
      }

  }
 formatSalaryData(){    
          let delrow=Object.keys(this.data);
          for(var j in this.data)
          {        
            this._wages = new Wages;    
            this._wages.grossIncome = this.data[j]['grosssalary'];  
            this._wages.netIncome = this.data[j]['grosssalary'] - this.data[j]['taxRate'];  
            this._wages.overtime = this.data[j]['overtimeRate'];           
            this._wages.status = this.data[j]['status']; 
            this._wages.totalCommission = 0; 
            this._wages.totalHour = 0;      
            this._wages.salaryProfileID = this.data[j]['salaryProfileID'];                      
            this.wages.push(this._wages);                
          }    
       return 0;
  }
  
  onFormSubmit({ value, valid}: { value: Payroll,  valid: boolean }) {    
        
                this.payroll = value; 
                //this.address = value1;   
                this.formatSalaryData();
                console.log(this.wages);           
                this.payroll.approve = this.payroll.payDate;
                this.payroll.prepeareDate = this.payroll.payDate;
                this.payroll.totalGrossPay = this.grossSalary;
                this.param = {'payroll': this.payroll, 'wages': this.wages };
                
                let body = JSON.stringify(this.param);
                console.log(this.param);        
                this.service.addPayroll(this.param)                    
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
   getEmployees(){    
    this.eservice._getEmployees()
    .subscribe(employee =>{         
      this.employee = employee;
    })
 }
 getSalaryProfile(type: string){    
  this.service.getSalaryProfile(type)
  .subscribe(hourly =>{  
   // console.log(hourly),       
    this.hdata = hourly;
  })
}
getMonthlySalaryProfile(){    
  this.service.getMonthlySalaryProfile()
  .subscribe(monthly =>{         
    this.data = monthly;
  })
}
getCommissiondSalary(type: string){    
  this.service.getSalaryProfile(type)
  .subscribe(commssion =>{         
    this.cdata = commssion;
  })
}
addSalaryprofile(){
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
      
      salaryProfileID: {
        title: 'ID',
        filter: false,
      },
      per_name: {
        title: 'Name',
        filter: false,
      },
      designation: {
        title: 'Designation',
        filter: false,
      },   
      status: {
        title: 'Status',
        filter: false,
      }, 
      overtimeRate: {
        title: 'Overtime Rate',
        type: 'html',
         filter: false,     
      },
      profileType: {
        title: 'Profile Type',
        filter: false,
      },
      providentFund: {
        title: 'ProvidentFund',
        type: 'html',
        filter: false,                       
      },     
      grosssalary:{
        title: 'Gross Salary',
        type: 'html',
        filter: false,                   
      },  
      taxRate: {
        title: 'Tax Rate',
        type: 'html',
        filter: false,                     
      },
      netPay: {
        title: 'Net Pay',
        type: 'html',
        filter: false,                     
        valuePrepareFunction: (cell, row) => { return Number(row.grosssalary - ((row.taxRate * row.grosssalary)/100)) },
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
modifyData(event){
  this.delflag=true;
  // console.log(this.data);
  let delrow=Object.keys(event.data);
  for(var j in this.data)
  {
    this.grossSalary = this.grossSalary + this.data[j]['grosssalary'];
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


addHourlySalaryprofile(){
  this.hsettings = {
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
      
      salaryProfileID: {
        title: 'ID',
        filter: false,
      },
      per_name: {
        title: 'Name',
        filter: false,
      },
      designation: {
        title: 'Designation',
        filter: false,
      },   
      status: {
        title: 'Status',
        filter: false,
      }, 
      overtimeRate: {
        title: 'Overtime Rate',
        type: 'html',
         filter: false,     
      },  
    
      hourlyRate: {
        title: 'Hourly Rate',
        type: 'html',
        filter: false,                     
      }, 
      totalHour: {
        title: 'Hours',
        type: 'text',
        filter: false,                     
      },  
      grossTotal: {
        title: 'Gross',
        type: 'html',
        filter: false,  
        valuePrepareFunction: (cell, row) => { return Number(row.totalHour * row.hourlyRate)},                         
      },  
      taxRate: {
        title: 'Tax Rate',
        type: 'html',
        filter: false,                     
      },
     netPay: {
        title: 'Net pay',
        type: 'html',
        filter: false,   
        valuePrepareFunction: (cell, row) => { return Number((row.totalHour * row.hourlyRate) - row.taxRate)},                                       
      },
    }
  };
}
addHourlyData(event){
  if(this.delflag){
    this.hdata.push(event.newData);
    //console.log(event.newData);
  }
  // console.log(event);
  event.confirm.resolve(event.newData);
}
modifyHourlyData(event){
  this.delflag=true;
  // console.log(this.data);
  let delrow=Object.keys(event.data);
  for(var j in this.hdata)
  {
    // console.log(this.data,event.data);
  if(this.hdata[j]==event.data)
    {
      this.hdata.splice(1,1);
      // this.data=event.source.data;
    }
  }
  event.confirm.resolve(event.source.hdata);
  
  // console.log(this.data)
  if(this.hdata.length==0)
    {this.hdata=[];
      this.delflag=false;
    }
}

addCommissionSalaryprofile(){
  this.csettings = {
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
      
      salaryProfileID: {
        title: 'ID',
        filter: false,
      },
      per_name: {
        title: 'Name',
        filter: false,
      },
      designation: {
        title: 'Designation',
        filter: false,
      },   
      status: {
        title: 'Status',
        filter: false,
      }, 
      overtimeRate: {
        title: 'Overtime Rate',
        type: 'html',
         filter: false,     
      },
     
      providentFund: {
        title: 'ProvidentFund',
        type: 'html',
        filter: false,                       
      },
      taxRate: {
        title: 'Tax Rate',
        type: 'html',
        filter: false,                     
      },
      commissionRate: {
        title: 'Commission Rate',
        type: 'html',
        filter: false,                     
      },
      grosssalary: {
        title: 'Gross Salary',
        type: 'html',
        filter: false,                     
      },  
    }
  };
}
addCommissionData(event){
  if(this.delflag){
    this.cdata.push(event.newData);
    //console.log(event.newData);
  }
  // console.log(event);
  event.confirm.resolve(event.newData);
}
modifyCommissionData(event){
  this.delflag=true;
  // console.log(this.data);
  let delrow=Object.keys(event.data);
  for(var j in this.cdata)
  {
    // console.log(this.data,event.data);
  if(this.cdata[j]==event.data)
    {
      this.cdata.splice(1,1);
      // this.data=event.source.data;
    }
  }
  event.confirm.resolve(event.source.cdata);
  
  // console.log(this.data)
  if(this.cdata.length==0)
    {this.cdata=[];
      this.delflag=false;
    }
}
}
