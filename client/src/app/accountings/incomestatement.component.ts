import { Component, OnInit } from '@angular/core';
import { TransactionService  } from '../services/transaction.service';
import { AccountingService  } from '../services/accounting.service';

import { IncomeStatement } from '../accountings/accounting';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-incomestatement',
  templateUrl: 'incomestatement.component.html'
  //styleUrls: ['./incomestatement.component.scss']
})
export class IncomestatementComponent implements OnInit {
  incomeStatement2: IncomeStatement;
  private income : Observable<IncomeStatement[]>;    
  private incomeStatement: IncomeStatement[];
  
  constructor(public service2:TransactionService,
    public service:AccountingService) { }

  ngOnInit() {
    this.getStatement();
  }
  getStatement(): void {
    this.service.getIncomeStatement().subscribe(incomeStatement => {
      this.income = incomeStatement['income']; 
    });
   
  }
  getStatement2(){   
    this.service2.getStatement(10)    
    .subscribe(incomeStatement =>{         
       this.incomeStatement= incomeStatement;
     })
 }
 
}
