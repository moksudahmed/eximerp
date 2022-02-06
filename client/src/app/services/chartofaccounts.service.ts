import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SubSidiaryAccount } from '../accountings/accounting';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ChartOfAccount } from '../accountings/accounting';
 
const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};

@Injectable()
export class ChartofaccountsService {

  private apiUrl= 'http://localhost/project/erp/server/backend/web/chart-of-account/';
  constructor(private http:Http, private _htc:HttpClient) { 
    
  }
    get(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }
    getAccounts (): Observable<ChartOfAccount[]> {
  
      return this._htc.get<ChartOfAccount[]>('http://localhost:1337/api/chartofaccount', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Chart of Accounts:", data)),        
      );
    }
    
    getAccounts1(){
      return this.http.get('http://localhost/project/erp/server/backend/web/chart-of-account')
              .map(res=> res.json());
    }
    addAccounts(info){
     // console.log(info);
      return this.http.post('http://localhost/project/erp/server/backend/web/chart-of-account',info)
            .map(res=> res.json());
    }
    deleteAccounts(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
    updateAccounts(id, info){
      return this.http.put('http://localhost/project/erp/server/backend/web/chart-of-account/'+id, info)
          .map(res => res.json());
  }
  getAccountsList(){
    return this.http.get('http://localhost/project/erp/server/backend/web/chart-of-account/accounts')
            .map(res=> res.json());
  }
  _getAccountsList(){
      let nrs: any;
      let other = []; 
      this.http.get('http://localhost/project/erp/server/backend/web/chart-of-account/accounts')
        .map((res:Response) => res.json())
        .subscribe(
          data => { nrs = data},
          err => console.error(err),
          () => console.log(other)
        );
  }
  getAllNrs() {
    let nrs: any;
    this.http.get('http://localhost/project/erp/server/backend/web/chart-of-account/accounts')
        .map((res: Response) => res.json())
        .subscribe(
            data => {
                nrs = data.map(nrObj => nrObj.chartOfAccountID)
            },
        );
}

private handleError(error: any) {
  console.error('An error occurred');
  return Promise.reject(error.message || error);
  }	
  
  }
