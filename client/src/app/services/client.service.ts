import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Client,Owner,Partnership, ContactInfo, Company, ClientAccounts, IndividualCustomer, CorporateCustomer } from '../clients/client';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Order } from '../sales/sales';
import { Customer } from '../clients/client';
import { PurchaseOrder, PurchaseRequest, PurchaseRequestCart, Qutation, LC, SalesContract, CorporateSupplier, Witness, _Witness, Supplier, BillOfEntry, IndividualSupplier, ThirdPartAgent } from '../purchase/purchase';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { retry} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};

@Injectable()
export class ClientService {

  private apiUrl= 'http://localhost:1337/api/';
  constructor(private http:Http, private _htc:HttpClient) { }    
    
  addClient(info): Observable<Client> {
    console.log(info);
    return this._htc.post<Client>(this.apiUrl+'client/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  addPartnership(info): Observable<Partnership> {
    console.log(info);
    return this._htc.post<Partnership>(this.apiUrl+'owner/owner-orgnization/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  addCorporateOwner(info): Observable<Owner> {
    console.log(info);
    return this._htc.post<Owner>(this.apiUrl+'owner/create-corporate-owner', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getOwners():Observable<Owner[]>{
    
    return this._htc.get<Owner[]>(this.apiUrl+'owners-name', httpOptions)
    .pipe(
      tap(data => console.log("Owners :", data)),        
    );       
    
  }

  addClient2(info){
      return this.http.post('http://localhost/project/erp/server/backend/web/client',info)
            .map(res=> res.json());
    }
    addCorporateClient(info){
      return this.http.post('http://localhost/project/erp/server/backend/web/company',info)
            .map(res=> res.json());
    }
    getInsurance():Observable<Client[]>{
      return this._htc.get<Client[]>("http://localhost/project/erp/server/backend/web/client/insurance")
      .pipe(
        tap(data => console.log("Anlagenstatus Daten:", data)),        
      ); 
    }
    getCustomer(): Observable<Customer[]> {  
      return this._htc.get<Customer[]>(this.apiUrl+'customer', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Customer:", data)),        
      );
    }
    getCustomers(): Promise<any> {
      return new Promise((resolve, reject) => {
        return this._htc.get(this.apiUrl+'customer',httpOptions).toPromise().then(response => {
          resolve(response);
        }).catch(() => reject());
      });
    }
    getContactInfo(id:number): Observable<ContactInfo[]> {  
      return this._htc.get<ContactInfo[]>(this.apiUrl+'find-customer-contact/'+id, httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Contact Info:", data)),        
      );
    }
    getIndividualCustomer(): Observable<IndividualCustomer[]> {  
      return this._htc.get<IndividualCustomer[]>(this.apiUrl+'individual-customer', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Customer:", data)),        
      );
    }
    
    getCorporateCustomer(): Observable<CorporateCustomer[]> {  
      return this._htc.get<CorporateCustomer[]>(this.apiUrl+'corporate-customer', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Customer:", data)),        
      );
    }
    search(term: string) {
      let promise = new Promise((resolve, reject) => {
        let apiURL = `${this.apiUrl+'find-customer'}?term=${term}&limit=20`; //&media=music
        this._htc
          .get(apiURL,httpOptions)
          .toPromise()
          .then(
            res =>{
              resolve(res);
              console.log(res);
              resolve();
            },        
            msg => {
              // Error
              reject(msg);
            }
          );
      });
      return promise;
    }
    
    getClientAccount(): Observable<ClientAccounts[]> {  
      return this._htc.get<ClientAccounts[]>(this.apiUrl+'clientaccount', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Customer:", data)),        
      );
    }
    getCorporateSupplier(): Observable<CorporateSupplier[]> {  
      return this._htc.get<CorporateSupplier[]>(this.apiUrl+'corporate-supplier', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("CorporateSupplier:", data)),        
      );
    }
    getIndividualSupplier(): Observable<IndividualSupplier[]> {  
      return this._htc.get<IndividualSupplier[]>(this.apiUrl+'individual-supplier', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("IndividualSupplier:", data)),        
      );
    }
    getIndividualSupplierType(type): Observable<IndividualSupplier[]> {  
      return this._htc.get<IndividualSupplier[]>(this.apiUrl+'individual-supplier/type/'+ type, httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("IndividualSupplier:", data)),        
      );
    }
    getCorporateSupplierType(type): Observable<CorporateSupplier[]> {  
      return this._htc.get<CorporateSupplier[]>(this.apiUrl+'corporate-supplier/type/'+ type, httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("CorporateSupplier:", data)),        
      );
    }
    getThirdPartAgent(): Observable<ThirdPartAgent[]> {
      return this._htc.get<ThirdPartAgent[]>(this.apiUrl+'third-party-agents', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Agents:", data)),        
      );
    }
    getWitness(): Observable<Witness[]> {
    //  console.log(this.apiUrl+'client/witness');
      return this._htc.get<Witness[]>(this.apiUrl+'client/witness', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Witness", data)),        
      );
    }
    getClient(){
      return this.http.get(this.apiUrl)
              .map(res=> res.json());
    }
    getOrderById(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }
    getOrder(){
      return this.http.get('http://localhost/project/erp/server/backend/web/order')
              .map(res=> res.json());
    }
    deletePerson(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
    updatePerson(id, info){
      return this.http.put('http://localhost/project/erp/server/backend/web/person/'+id, info)
          .map(res => res.json());
  }
  
  private handleError(error: any) {
    console.error('An error occurred');
    return Promise.reject(error.message || error);
    }	

}
