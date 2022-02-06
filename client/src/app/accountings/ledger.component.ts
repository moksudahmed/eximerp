import { Component, OnInit } from '@angular/core';
import { TransactionService  } from '../services/transaction.service';
import { AccountingService  } from '../services/accounting.service';

import { ChartOfAccount, Ledger } from './accounting';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';
import { Observable } from 'rxjs/Observable';

export class Ledger2{
  l_journalid: number;
  l_jdate: Date;
  l_accounttitle: string;
  l_debitcredit: string;
  l_debit_amount: number;
  l_credit_amount: number;
  l_balance_debit: number;
  l_balance_credit: number;  
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html' 
})
export class LedgerComponent implements OnInit {
  ledger2: Ledger2;
  //private accounts: ChartOfAccount;
  private account : Observable<ChartOfAccount[]>;    
  private accounts: ChartOfAccount[];

  accountName :string;
  private ledgers : Observable<Ledger[]>;    
  private ledger: Ledger[];
  constructor(public acService: AccountingService) { }

  ngOnInit() {

    this.getAccounts();

  }
  
 getAccounts(): void {
  
  this.acService.getAllChartOfAccounts().subscribe(cAccounts => {
    this.account = cAccounts['chartofaccount']; 
  });
 
}

 onChange(name) {
   
  this.acService.getLedgerByName(name).subscribe(ledger => {
    this.ledgers = ledger['ledger']; 
    console.log(ledger['ledger']);
  });
 
}

}
