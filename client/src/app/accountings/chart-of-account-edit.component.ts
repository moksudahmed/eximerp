import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountingService  } from '../services/accounting.service';
import { ChartOfAccount } from './accounting';
import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-chart-of-account-edit',
  templateUrl: './chart-of-account-edit.component.html',
  styleUrls: ['./chart-of-account-edit.component.scss']
})

export class ChartOfAccountEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  accountData: Observable<ChartOfAccount>; 
  
  constructor(
    public restApi: AccountingService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() { 
    
    this.restApi.getAnAccount(this.id)
    .subscribe(cAccounts=>{        
      this.accountData = cAccounts['chartofaccount'];;
    })
  }
    // Update employee data
  updateAccount() {
   
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateChartOfAccount(this.id, this.accountData).subscribe(data => {
      this.goBack()
      })
    }
  }
  goBack(){
    this.router.navigate(['/accountings/chartofaccount']);
  }
}
