import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class TransactionService {

  private apiUrl= 'http://localhost/project/erp/server/backend/web/transaction/';
  constructor(private http:Http) { }
  
    get(page = 1){
      let url ='http://localhost/project/erp/server/backend/web/transaction';
      return this.http.get(url).map(data=>data.json());
    }
  
    addTransaction(info){           
      return this.http.post('http://localhost/project/erp/server/backend/web/transaction',info)
             .map(res=> console.log(res.json()));
    }
    getTransaction(){
      return this.http.get('http://localhost/project/erp/server/backend/web/transaction')
              .map(res=> res.json());
    }
    deleteTransaction(id){
      return this.http.delete(this.apiUrl+id)
          .map(res => res.json());
  }
    updateTransaction(id, info){
      return this.http.put('http://localhost/project/erp/server/backend/web/transaction/'+id, info)
          .map(res => res.json());
  }
  getStatement(id){
    return this.http.get('http://localhost/project/erp/server/backend/web/journal/incomestatement')
           .map(res=> res.json());
  /*  return this.http.get('http://localhost/project/erp/server/backend/web/journal/'+id).subscribe(data => {
      console.log(data);
    });*/
  }
  getTrialBalance(){
    return this.http.get('http://localhost/project/erp/server/backend/web/journal/trialbalance')
           .map(res=> res.json()); 
  }
  getLedger(name){
    return this.http.get('http://localhost/project/erp/server/backend/web/journal/'+name)
           .map(res=> res.json()); 
  }
  getBalanceSheet(){
    return this.http.get('http://localhost/project/erp/server/backend/web/journal/balancesheet')
           .map(res=> res.json()); 
  }
  getJournal(){
    return this.http.get('http://localhost/project/erp/server/backend/web/journal/journal')
           .map(res=> res.json()); 
  }
  getSingelJournal(name){
    return this.http.get('http://localhost/project/erp/server/backend/web/journal/singlejournal'+name)
    .map(res=> res.json());     
  }
}
