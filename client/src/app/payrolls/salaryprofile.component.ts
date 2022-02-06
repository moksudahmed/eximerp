import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import { Employee, SalaryProfile } from './employee';
import { EmployeeService  } from '../services/employee.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
@Component({
  selector: 'app-salaryprofile',
  ///templateUrl: './salaryprofile.component.html',
    
  template: `
  <div class="row">
  <div class="col-lg-12">
      <div class="card">
      <form novalidate  enctype="multipart/form-data" class="form-horizontal "
      
        #salaryProfileForm="ngForm">
           <div class="card-header">
           <button type="button" class="btn btn-info"  (click)="addEmployeeSalaryProfile()">+ New</button>
           </div>
  <div class="card-body"> 
  <div class="row">
 
 <div class="col-lg-4"></div>

</div>  
    <div class="form-group">
  <ng2-smart-table [settings]="settings" [source]="data"
  (createConfirm)="addData($event)"
  ></ng2-smart-table>
   
    </div>     
  </div>  
    <div class="card-footer">
    <button (click)="onSalaryProfileFormSubmit(salaryProfileForm)"  type="submit" class="btn btn-sm btn-primary"><i class="fa fa-dot-circle-o"></i> Submit</button>
    <button type="reset" class="btn btn-sm btn-danger"><i class="fa fa-ban"></i> Reset</button>
  </div>
</form></div>
</div></div>
    `,  
  styleUrls: ['./salaryprofile.component.scss']
})
export class SalaryprofileComponent implements OnInit {
  delflag=false;
  settings: any;  
  data = [];
  
  private salaryProfile: SalaryProfile[] = [];
  private _salaryProfile: SalaryProfile;
 
  private employee: Employee;

  constructor( private http:Http) {
    this.employee = new Employee();
    this.getAllEmployee();
   }

  ngOnInit() {
  
    console.log(this.salaryProfile);
  }

  onSalaryProfileFormSubmit(){
        this.formatJournalData();
        
  }
  formatJournalData(){

    let delrow=Object.keys(this.data);
    for(var j in this.data)
    {        
      this._salaryProfile = new SalaryProfile;    
      this._salaryProfile.overtimeRate = this.data[j]['overtimeRate'];
      this._salaryProfile.profileType = this.data[j]['profileType'];
      this._salaryProfile.providentFund = this.data[j]['providentFund'];
      this._salaryProfile.taxRate = this.data[j]['taxRate'];
      this.salaryProfile.push(this._salaryProfile);     
       
    }    
 return 0;
}
getAllEmployee() {
  this.http.get('http://localhost/project/erp/server/backend/web/employee')
    .map((res:Response) => res.json())
    .subscribe(
      data => { this.employee = data},
      err => console.error(err),
      () => console.log(this.employee)
    );    
}
  addEmployeeSalaryProfile(){
    
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
   
        chartOfAccountID: {
          title: 'Employee Id',
          filter: false,
          editor: {
            type: 'completer',
            config: {
              completer: {
                data: this.employee,
                searchFields: 'employeeID',
                titleField: 'employeeID',
              //  descriptionField: 'accountName',
              },
            },
          },
        },
        profileType: {
          title: 'profileType',
          type: 'html',
          filter: false,
          editor: {
            type: 'list',
            config: {
              list: [{ value: 'partime', title: 'Par-time' }, { value: 'fulltime', title: 'Full Time' }]
            }
          }
        },    
       
        overtimeRate: {
          title: 'Overtime Rate',
          filter: false,
        },
       
          rovidentFund: {
            title: 'Povident Fund',
            filter: false,          
            //valuePrepareFunction: (cell, row) => { if(row.creditAmount == 1) return 199  }
          },
          taxRate: {
            title: 'Tax Rate',
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

