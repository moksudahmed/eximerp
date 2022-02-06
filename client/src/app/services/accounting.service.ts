import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,URLSearchParams } from '@angular/http';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SubSidiaryAccount, Journal, VwJournal, Ledger, IncomeStatement, TrialBalance } from '../accountings/accounting';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ChartOfAccount, Transaction, FinancialYear } from '../accountings/accounting';
import { retry} from 'rxjs/operators';
import { stringify } from 'querystring';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};


@Injectable()
export class AccountingService {


  private headers: Headers;
  //private handleError: HandleError;
  private accounts: ChartOfAccount[];
  private apiUrl= 'http://localhost:1337/api/';
  constructor(private http:Http, private _htc:HttpClient) {
  //  this.handleError = httpErrorHandler.createHandleError('AccountingService'); 
  }    
  
 // Chart of Account Services 

  createChartOfAccount(info): Observable<ChartOfAccount> {
    return this._htc.post<ChartOfAccount>(this.apiUrl+'chart-of-account/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllChartOfAccounts():Observable<ChartOfAccount[]>{
    return this._htc.get<ChartOfAccount[]>(this.apiUrl+'chart-of-account', httpOptions)
    .pipe(
      retry(1),
      tap(data => console.log("Account:", data)),        
    );
  }

  getChartOfAccountBalance():Observable<any[]>{
    return this._htc.get<any[]>(this.apiUrl+'chart-of-account/account-blance', httpOptions)
    .pipe(
      retry(1),
      tap(data => console.log("Account:", data)),        
    );
  }

  getSubSidiaryAccount():Observable<SubSidiaryAccount[]>{
    return this._htc.get<SubSidiaryAccount[]>(this.apiUrl+'chart-of-account', httpOptions)
    .pipe(
      retry(1),
      tap(data => console.log("Chart Of Account:", data)),        
    );       
    
  }
  // HttpClient API get() method => Fetch employee
  
  getAnAccount(id): Observable<ChartOfAccount> {
    return this._htc.get<ChartOfAccount>(this.apiUrl + 'chart-of-account/find/' + id, httpOptions)
    .pipe(
      tap(data => console.log("Chart Of Account:", data)),
      catchError(this.handleError)
    )
  }  

  getChartOfAccountByCategory(category: string):Observable<ChartOfAccount[]>{
    console.log(category);
    return this._htc.get<ChartOfAccount[]>(this.apiUrl+'chart-of-account/findcategory/'+category , httpOptions)
    .pipe(
      tap(data => console.log("Chart Of Account:", data)),
      catchError(this.handleError)
      );       
    
  }
 
  
  determineAccount2(account, nature, payment):Observable<any>{
   let url = `${this.apiUrl+'chart-of-account/get-account'}?account=${account}&nature=${nature}&payment=${payment}`;    
    return this._htc.get<any>(url, httpOptions)
    .pipe(
      tap(data => console.log("Determine:", data)),
      catchError(this.handleError)
      );       
    
  }

  determineAccount(account, nature, payment): Promise<any> {
    let url = `${this.apiUrl+'chart-of-account/get-account'}?account=${account}&nature=${nature}&payment=${payment}`;    
  
    return new Promise((resolve, reject) => {
      return this._htc.get(url,httpOptions).toPromise().then(response => {
        resolve(response);
      }).catch(() => reject());
    });
  }
  

  // HttpClient API put() method => Update employee
  updateChartOfAccount(id, account): Observable<ChartOfAccount> {
    
    return this._htc.put<ChartOfAccount>(this.apiUrl + 'chart-of-account/update/' + id, account, httpOptions)
    .pipe(
      tap(data => console.log("Record Updated")),
      catchError(this.handleError)
    )
  }

   deleteChartOfAccount(id){
     return this._htc.delete<ChartOfAccount>(this.apiUrl + 'chart-of-account/delete/'+ id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
// Financial Year Service //

getAllFinancialYear():Observable<FinancialYear[]>{
  return this._htc.get<FinancialYear[]>(this.apiUrl+'financialyear', httpOptions)
  .pipe(
    retry(1),
    tap(data => console.log("Financial Year:", data)),        
  );
}


  // Transaction Services 
  addTransaction2(transaction: Transaction, journal:Journal[]){
    console.log("T",transaction);
    console.log("J",journal);
    return this._htc.post(this.apiUrl+"transaction/create",
       transaction,
       httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  addTransaction(transaction: Transaction[], journal:Journal[]){
    console.log('sc', journal);
    return this._htc.post(this.apiUrl+"transaction/create",
    {
      "transaction": transaction,
      "journal": journal,     
    },
    httpOptions)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
        },
        error => {
            console.log("Error", error);
        }
    );      
  }

  
  addFinancialYear(info): Observable<FinancialYear> {
    console.log(info);
    return this._htc.post<FinancialYear>(this.apiUrl+'financialyear/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getTransactions (): Observable<Transaction[]> {
  
    return this._htc.get<Transaction[]>(this.apiUrl+'transaction', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Transactions:", data)),        
    );
  }
  getTransaction(){
    return this._htc.get<Transaction[]>(this.apiUrl+'transaction')
    .pipe(
      tap(data => console.log("Transaction:", data)),        
    );   
  }




// Journal Services

  getJournals (): Observable<Journal[]> {  
    return this._htc.get<Journal[]>(this.apiUrl+'journal', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Journals:", data)),        
    );
  }
  
  getJournalsByAccount (name:string): Observable<VwJournal[]> {  
    return this._htc.get<VwJournal[]>(this.apiUrl+'accounting/journal/'+ name, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Journals:", data)),        
    );
  }
  


// Verious SubSidiary Accounting Function Services

  getChartOfAccount():Observable<ChartOfAccount[]>{
    return this._htc.get<ChartOfAccount[]>(this.apiUrl+'sub-sidiary-account/get-account', httpOptions)
    .pipe(
      retry(1),
      tap(data => console.log("Account:", data)),        
    );       
    
  }

  getAllSubSidiaryAccountByChart(id):Observable<SubSidiaryAccount[]>{
    return this._htc.get<SubSidiaryAccount[]>(this.apiUrl+'sub-sidiary-account/find-by-chart-of-account-id/'+id, httpOptions)
    .pipe(
      retry(1),
      tap(data => console.log("Account:", data)),        
    );       
    
  }

  // Verious Accounting Function Services


getSubSadiaryAccount():Observable<SubSidiaryAccount[]>{
  return this._htc.get<SubSidiaryAccount[]>(this.apiUrl+'sub-sidiary-account')
  .pipe(
    tap(data => console.log("SubSidiaryAccount:", data)),        
  ); 
 
}

getLedgers (): Observable<Ledger[]> {

  return this._htc.get<Ledger[]>(this.apiUrl+'ledger', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("Ledger:", data)),        
  );
}

getLedgerByName(name): Observable<Ledger> {
  return this._htc.get<Ledger>(this.apiUrl + 'ledger/find/' + name, httpOptions)
  .pipe(
    tap(data => console.log("Ledgers:", data)),
    catchError(this.handleError)
  )
}  
getIncomeStatement (): Observable<IncomeStatement[]> {

  return this._htc.get<IncomeStatement[]>(this.apiUrl+'accounting/income-statement', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("IncomeStatement:", data)),        
  );
}

getTrialBalance (): Observable<TrialBalance[]> {

  return this._htc.get<TrialBalance[]>(this.apiUrl+'accounting/trial-balance', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("TrialBalance:", data)),        
  );
}





   // Error handling 

   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


}
