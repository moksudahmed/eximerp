import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountingService  } from '../services/accounting.service';
import { ChartOfAccount, FinancialYear, Transaction,  } from './accounting';
import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ParamMap } from '@angular/router';

import { TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  public chartOfAccount:Observable<ChartOfAccount[]>;    
  public fYears: Observable<FinancialYear[]>;
  private trans : Observable<Transaction[]>;   
  public financialYear: FinancialYear;
  public selectedYear: FinancialYear;
  private accounts:ChartOfAccount;
  
  modalRef: BsModalRef;
  param: any;
  constructor(
    public service: AccountingService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private modalService: BsModalService
  ) {
    this.financialYear = new FinancialYear();
    this.accounts = new ChartOfAccount();
   }

  ngOnInit() {
    this.getAllFYears();
    this.getAllAccounts();
    this.getTransactions();
  }

  getAllAccounts(): void {
    this.service.getAllChartOfAccounts().subscribe(cAccount => {
      this.chartOfAccount = cAccount['chartofaccount']; 
    });    
}

getAllFYears(): void {
  this.service.getAllFinancialYear().subscribe(fyear => {
    this.fYears = fyear['fyears']; 
  });    
}

getTransactions(): void {
  this.service.getTransactions().subscribe(t => {
    this.trans = t['transaction']; 
  });
 
}

onFormSubmit({ value, valid}: { value: FinancialYear, valid: boolean }) {
  this.param = {'financialYear':this.financialYear};
  let body = JSON.stringify(this.param);
  console.log('Param',this.param);
  this.service.addFinancialYear(this.param)                    
              .subscribe(
                (val) => {
                    alert("Created sucessfully!");
                    this.modalRef.hide()
                    this.getAllFYears();
                },
                response => {
                    alert("Already exist!");                    
                },
                () => {
                  // alert("The POST observable is now completed.");                   
                });
  
   //   this.goBack();

}


onChartofAccountFormSubmit({ value, valid}: { value: ChartOfAccount, valid: boolean }) {
    this.accounts = value;
    console.log( this.accounts);
  //  console.log("valid: " + valid);
    this.service.createChartOfAccount(this.accounts)                
    .subscribe(
              (val) => {
                alert("Created sucessfully!");
                this.modalRef.hide()
                this.goBack();
            },
            response => {
                alert("Already exist!");                    
            },
            () => {
              // alert("The POST observable is now completed.");                   
            });
      
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
editModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
goBack(){    
  this.getAllAccounts();
//  this.getAccounts();   
}

}
