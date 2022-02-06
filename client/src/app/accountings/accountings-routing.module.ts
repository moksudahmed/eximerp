import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';

import { ChartOfAccountComponent } from './chartofaccount.component';
import { TransactionsComponent } from './transactions.component';
import { JournalsComponent } from './journals.component';
import { IncomestatementComponent } from './incomestatement.component';
import { TestComponent } from './test.component';
import { TrialbalanceComponent } from './trialbalance.component';
import { LedgerComponent } from './ledger.component';
import { BalancesheetComponent } from './balancesheet.component';
import { AccountsComponent } from './accounts.component';
import { JournalEntryComponent } from './journal-entry.component';
import { PaymentComponent } from './payment.component';
import { ChartOfAccountEditComponent } from './chart-of-account-edit.component';
import { TransactionListComponent } from './transaction-list.component';
import { SubsidiaryAccountComponent } from './subsidiary-account.component';
import { AccountingComponent } from './accounting.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Accountings'
    },
    children: [  
      {
        path: 'accounting',
        component: AccountingComponent,
        data: {
          title: 'Accounting'
        }
      },  
          
     /* {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },*/
      {
        path: 'chartofaccount',
        component: ChartOfAccountComponent,
        data: {
          title: 'Chart OF Account'
        }
      },
      {
        path: 'chart-of-account-edit/:id',
        component: ChartOfAccountEditComponent,
        data: {
          title: 'Edit'
        }
      },

      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: 'Transactions'
        }
      },
      {
        path: 'transactions-list',
        component: TransactionListComponent,
        data: {
          title: 'Transactions List'
        }
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        data: {
          title: 'Accounts'
        }
      },      
      {
        path: 'incomestatement',
        component: IncomestatementComponent,
        data: {
          title: 'Income Statement'
        }
      },
      {
        path: 'trialbalance',
        component: TrialbalanceComponent,
        data: {
          title: 'Trialbalance'
        }
      },
      {
        path: 'ledger',
        component:LedgerComponent,
        data: {
          title: 'Ledger'
        }
      },
      {
        path: 'balancesheet',
        component:BalancesheetComponent,
        data: {
          title: 'Balancesheet'
        }
      },
      {
        path: 'journal',
        component:JournalsComponent,
        data: {
          title: 'Journals'
        }
      },
      {
        path: 'journal-entry',
        component:JournalEntryComponent,
        data: {
          title: 'Journal Entry'
        }
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment'
        }
      },
      {
        path: 'subsidiary-account',
        component: SubsidiaryAccountComponent,
        data: {
          title: 'Payment'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingsRoutingModule {}
