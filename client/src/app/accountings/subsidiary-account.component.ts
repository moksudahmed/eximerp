import { Component, OnInit } from '@angular/core';
import { AccountingService  } from '../services/accounting.service';

import { ChartOfAccount,SubSidiaryAccount  } from './accounting';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-subsidiary-account',
  templateUrl: './subsidiary-account.component.html',
  styleUrls: ['./subsidiary-account.component.scss']
})
export class SubsidiaryAccountComponent implements OnInit {
  private subSidiary : Observable<SubSidiaryAccount[]>;  
  private  subSidiaryAccounts: Observable<SubSidiaryAccount[]>;  
  
  constructor(public service: AccountingService) { }

  ngOnInit() {
    this.getAccounts();
  }

 
  getAccounts(): void {
    this.service.getChartOfAccount().subscribe(accounts => {
      this.subSidiary = accounts['accounts']; 
    });

  }
  onChange(id) {
    this.service.getAllSubSidiaryAccountByChart(id).subscribe(accounts => {
      this.subSidiaryAccounts = accounts['subsidiaryaccount']; 
    });
   
  }
}

