import { Component, OnInit } from '@angular/core';
import { TransactionService  } from '../services/transaction.service';
export class Balancesheet{
  accountnaturetype: string;
  accounttitle: string;
  totalamount: number;
  totalbalance: number;   
}

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html'
  //styleUrls: ['./incomestatement.component.scss']
})
export class BalancesheetComponent implements OnInit {
  balancesheet: Balancesheet;
  constructor(public service:TransactionService) { }

  ngOnInit() {
    this.getBalancesheet();
  }
  getBalancesheet(){   
    this.service.getBalanceSheet()
    .subscribe(balancesheet =>{         
       this.balancesheet= balancesheet;
     })
 }
 
}

