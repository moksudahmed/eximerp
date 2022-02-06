import { Component, OnInit } from '@angular/core';
import { AccountingService  } from '../services/accounting.service';
import { ChartOfAccount } from './accounting';
import { AccountingsRoutingModule } from './accountings-routing.module';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: 'chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss']
})
export class ChartOfAccountComponent implements OnInit{
  
  private accounts:ChartOfAccount;
  private account : Observable<ChartOfAccount[]>;    
  private cAccounts: ChartOfAccount[];
 
  id = this.actRoute.snapshot.params['id'];
  employeeData: any = {};
  selectedId: number;
  private category: any[] = ['Current Assets',
                             'Fixed Assets',
                             'Expense',
                             'Income',
                             'Long term loan',
                             'Current Liability',
                             'Contra Current Assets',
                             'Contra Assets',
                             'Owner Equity'];

   constructor( public service:AccountingService,
    public actRoute: ActivatedRoute,
    public router: Router)   
  { }
 
  ngOnInit() {
    this.getAccounts();
    this.accounts = new ChartOfAccount();
  }

 onFormSubmit({ value, valid}: { value: ChartOfAccount, valid: boolean }) {
  this.accounts = value;
  console.log( this.accounts);
//  console.log("valid: " + valid);
  this.service.createChartOfAccount(this.accounts)                
  .subscribe(
          (val) => {
          alert("New Account has successfuly created.")
          console.log("POST call successful value returned in body", 
                      val);
        // this.invoicePdf(val); 
      },
      response => {
         alert("POST call in error" +response);
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      })
}
   getAccounts(): void {
    this.service.getAllChartOfAccounts().subscribe(cAccounts => {
      this.account = cAccounts['chartofaccount']; 
    });
   
  }
  
  deleteAccount(id) {
    console.log(id);
    if (window.confirm('Are you sure, you want to delete?')){
      this.service.deleteChartOfAccount(id).subscribe(data => {
        this.getAccounts();
      })
    }
  }  
 goBack(){    
        this.getAccounts();   
    }
      
      
}
