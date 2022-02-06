import { Component, OnInit } from '@angular/core';
import { TransactionService  } from '../services/transaction.service';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';
import { AccountingService } from '../services/accounting.service';
import { Journal, Transaction, ChartOfAccount } from './accounting';
import { AccountingsRoutingModule } from './accountings-routing.module';
import { NgModule } from '@angular/core';
import { ChartOfAccountComponent } from './chartofaccount.component';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  private trans : Observable<Transaction[]>;    
  private t: Transaction[];

  constructor(   public service:TransactionService,
    public accountsService:ChartofaccountsService,
    public aservice: AccountingService
 ) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.aservice.getTransactions().subscribe(t => {
      this.trans = t['transaction']; 
    });
   
  }
 
}


