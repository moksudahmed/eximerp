import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { FormsComponent } from './forms.component';
import { ChartOfAccountComponent } from './chartofaccount.component';

// Modal Component

import { TransactionsComponent } from './transactions.component';
import { JournalsComponent } from './journals.component';

// Components Routing
import { AccountingsRoutingModule } from './accountings-routing.module';

//Srvices
import { OrganizationService } from '../services/organization.service';
import { ChartofaccountsService } from '../services/chartofaccounts.service';
import { TransactionService } from '../services/transaction.service';
import { AccountingService  } from '../services/accounting.service';
import { PurchaseService } from '../services/purchase.service';
//import { JournalService } from './services/journal.service';
import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { TestComponent } from './test.component';
import { IncomestatementComponent } from './incomestatement.component';
import { TrialbalanceComponent } from './trialbalance.component';
import { LedgerComponent } from './ledger.component';
import { BalancesheetComponent } from './balancesheet.component';
import { AccountsComponent } from './accounts.component';
import { JournalEntryComponent } from './journal-entry.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { MyFilterPipe } from './MyFilterPiple'; 
import { JsonpModule } from '@angular/http';  
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { ChartOfAccountEditComponent } from './chart-of-account-edit.component';
import { TransactionListComponent } from './transaction-list.component';
import { SubsidiaryAccountComponent } from './subsidiary-account.component';
import { AccountingComponent } from './accounting.component';
@NgModule({
  imports: [
    AccountingsRoutingModule,  
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // 
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,   
    HttpModule,  
    JsonpModule  
  ],
  declarations: [  
    FormsComponent,
    ChartOfAccountComponent,
    TransactionsComponent,
    JournalsComponent,
    TestComponent,
    IncomestatementComponent,
    TrialbalanceComponent,
    LedgerComponent,
    BalancesheetComponent,
    AccountsComponent,
    JournalEntryComponent,
    MyFilterPipe,
    PaymentComponent,
    ChartOfAccountEditComponent,
    TransactionListComponent,
    SubsidiaryAccountComponent,
    AccountingComponent
  ],
  providers: [    
    OrganizationService, 
    ChartofaccountsService, 
    TransactionService,
    AccountingService,
    PurchaseService
  //  JournalService,    
  ],
  
})
export class AccountingsModule { }
