import { Component, OnInit } from '@angular/core';
import { AccountingService  } from '../services/accounting.service';

import { TrialBalance } from '../accountings/accounting';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-trialbalance',
  templateUrl: './trialbalance.component.html',
  //styleUrls: ['./incomestatement.component.scss']
})
export class TrialbalanceComponent implements OnInit {
  
  private trialbalance : Observable<TrialBalance[]>;    
  private balance: TrialBalance[];
 
  constructor(public service:AccountingService) { }

  ngOnInit() {
    this.getStatement();
  }
  getStatement(): void {
    this.service.getTrialBalance().subscribe(balance => {
      this.trialbalance = balance['balance']; 
    });
   
  }
  
 
}
