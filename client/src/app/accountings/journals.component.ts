import { Component, OnInit } from '@angular/core';
import { AccountingService  } from '../services/accounting.service';
import { TransactionService  } from '../services/transaction.service';

import { Journal, VwJournal } from './accounting';
import { ChartOfAccount } from './accounting';
import { Observable } from 'rxjs/Observable';


export class _Journal{
  date: Date;  
  transactionTitle: string;
  categoryType: string;
  accountName: string;    
  debitCredit: string;
  amount: number;
}
@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  //styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {

  //journal: _Journal;
  private accounts: ChartOfAccount;
  accountName :string;
  private journals : Observable<Journal[]>;    
  private journal: Journal[];

  
  private _journals : Observable<VwJournal[]>;    
  private _journal: VwJournal[];

  private account : Observable<ChartOfAccount[]>;    
  private cAccounts: ChartOfAccount[];
 
  constructor(public service:AccountingService,
    public transService:TransactionService
  ) { 

    this.accounts = new ChartOfAccount(); 
  }

  ngOnInit() {
    this.getAccounts();
  }
   getAccounts(): void {
    this.service.getAllChartOfAccounts().subscribe(cAccounts => {
      this.account = cAccounts['chartofaccount']; 
    });
   
  } 
  
 onChange(name) {
  this.service.getJournalsByAccount(name).subscribe(_journal => {
    this._journals = _journal['journal']; 
    console.log(_journal['journal']);
  });
 
}
}
