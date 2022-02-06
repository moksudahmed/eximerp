import { Component, OnInit } from '@angular/core';
import { TransactionService  } from '../services/transaction.service';
import { ChartOfAccount } from './accounting';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';
import { Observable } from 'rxjs/Observable';
import { AccountingService } from '../services/accounting.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface AccountBalance {
    accounttitle: string;
    categorytype: string;
    debit: number;
    credit: number;
    balance: number;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})


export class AccountsComponent implements OnInit {
 
  private account : Observable<ChartOfAccount[]>;    
  private accounts: ChartOfAccount[];
  private accountBalance: AccountBalance[];
  
  constructor(
    public service:ChartofaccountsService, public aservice:AccountingService
  ) { 
   
  }
  ngOnInit() {
   this.getAccounts();       
  }
  
  getAccounts(): void {
    this.aservice.getChartOfAccountBalance().subscribe(account => {
      this.accountBalance = account['accounts']; 
    });   
  }
}
