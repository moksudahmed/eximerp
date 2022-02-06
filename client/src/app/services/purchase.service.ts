import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order, Payment } from '../sales/sales';
import { PurchaseOrder, PurchaseRequest, PurchaseRequestCart, Qutation, LC, SalesContract, CorporateSupplier, Witness, _Witness, Supplier, BillOfEntry, IndividualSupplier, ThirdPartAgent } from '../purchase/purchase';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Item, Properties, Category, Stock, StockLevel, _StockLevel } from '../products/item';
import { retry} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};
@Injectable()
export class PurchaseService {
  private headers: Headers;
  private handleError: HandleError;

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
 
  private apiUrl= 'http://localhost:1337/api/purchase/';

  private apiUrlOld= 'http://localhost/project/erp/server/backend/web/';
  constructor(private http:Http, private _htc:HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PurchaseService'); 
  }    
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
    getData(id:number):Observable<Order[]>{
      return this.http.get(this.apiUrl+'clientaccount/'+id).map(r => <Order[]>r.json());
    }
    
    getPurchaseOrder(): Observable<PurchaseOrder[]> {  
      return this._htc.get<PurchaseOrder[]>(this.apiUrl+'purchase-order', httpOptions)
      .pipe(
       catchError(this.handleErrors),
       tap(data => console.log("Orders:", data)),        
      );
    }
    orderSearch(term: string) {
      let promise = new Promise((resolve, reject) => {
        let apiURL = `${this.apiUrl+'findbyterm'}?term=${term}&limit=20`; //&media=music
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
    
    getPurchaseOrderById(id): Observable<PurchaseOrder[]> {
      return this._htc.get<PurchaseOrder[]>(this.apiUrl+'findbyId/'+id, httpOptions)
      .pipe(
       catchError(this.handleErrors),
       tap(data => console.log("Purchase Order:", data)),        
      );
    }

    getPurchaseOrderByOrganizations(id): Observable<PurchaseOrder[]> {
      return this._htc.get<PurchaseOrder[]>(this.apiUrl+'find-by-organization/'+id, httpOptions)
      .pipe(
       catchError(this.handleErrors),
       tap(data => console.log("Purchase Order:", data)),        
      );
    }
  
    getQutation():Observable<Qutation[]>{
      return this._htc.get<Qutation[]>(this.apiUrl+'qutation', httpOptions)
      .pipe(
        catchError(this.handleErrors),
        tap(data => console.log("Qutation:", data)),        
      );     
    }
    
    getPurchaseRequestAll():Observable<PurchaseRequest[]>{
      return this._htc.get<PurchaseRequest[]>(this.apiUrl+'purchase-request', httpOptions)
      .pipe(
        tap(data => console.log("Anlagenstatus Daten:", data)),        
      );    
     
    } 
    getSupplier():Observable<Supplier[]>{
      return this._htc.get<Supplier[]>(this.apiUrl+'supplier', httpOptions)
      .pipe(
        tap(data => console.log("Anlagenstatus Daten:", data)),        
      );    
    }
           
    getLetterCredit():Observable<LC[]>{
      return this._htc.get<LC[]>(this.apiUrl+'letter-credit', httpOptions)
      .pipe(
        tap(data => console.log("LC:", data)),        
      ); 
     
    }

    getSalesContract():Observable<SalesContract[]>{
      return this._htc.get<SalesContract[]>(this.apiUrl+'sales-contract', httpOptions)
      .pipe(
        tap(data => console.log("SalesContract:", data)),        
      ); 
     
    }
    
    getPurchaseOrderCart(id): Observable<PurchaseRequestCart[]> {  
      return this._htc.get<PurchaseRequestCart[]>(this.apiUrl+'purchase-request-cart/'+id, httpOptions)
      .pipe(
       catchError(this.handleErrors),
       tap(data => console.log("PurchaseCart:", data)),        
      );
    }

    getCart(id:number):Observable<PurchaseRequestCart[]>{
      return this.http.get(this.apiUrl+'purchase-request-cart/'+id).map(r => <PurchaseRequestCart[]>r.json());
    }
    
    
    
    
    getLC(id:number):Observable<LC[]>{
      return this.http.get(this.apiUrl+"letter-credit/"+id).map(r => <LC[]>r.json());
    }
    
    
    getBillOfEntry():Observable<BillOfEntry[]>{
      return this._htc.get<BillOfEntry[]>(this.apiUrl+'bill-of-entry')
      .pipe(
        tap(data => console.log("Anlagenstatus Daten:", data)),        
      );     
    }
    
    getWitness():Observable<_Witness[]>{
      return this._htc.get<_Witness[]>(this.apiUrl+'witness')
      .pipe(
        tap(data => console.log("Anlagenstatus Daten:", data)),        
      ); 
     
    }
    getIndividualSupplier(id: number):Observable<IndividualSupplier>{
      return this._htc.get<IndividualSupplier>(this.apiUrl+'supplier/supplier/'+id)
      .pipe(
        tap(data => console.log("Individual data:", data)),        
      );      
    }
    getCorporateSupplier(id: number):Observable<CorporateSupplier>{
     
     return this._htc.get<CorporateSupplier>(this.apiUrl+'supplier/supplier/'+id)
      .pipe(
        tap(data => console.log("Corporate Data:", data)),        
      ); 
   
    }
 addContract(salesContract: SalesContract, detail:any[], lc: LC, witness: Witness){
   console.log('sc', salesContract);
   return this._htc.post(this.apiUrl+"sales-contract",
   {
     "salescontract": salesContract,
     "details": detail,
    "lettercredit": lc,
    "witness": witness,
   })
   .subscribe(
       data => {
           console.log("POST Request is successful ", data);
       },
       error => {
           console.log("Error", error);
       }
   );      
 }
  /** POST: add a new hero to the database */
  addContract1 (salesContract: SalesContract): Observable<SalesContract> {
    return this._htc.post<SalesContract>(this.apiUrl+'sales-contract', salesContract, httpOptions)
      .pipe(
        catchError(this.handleError('salesContract', salesContract))
      );
  }
    searchCorporateSupplier(term: string):Observable<CorporateSupplier[]>{
     // const url = `${this.apiUrl}/${id}`; // DELETE api/heroes/42
     
      
      /* GET heroes whose name contains search term */

        term = term.trim();

        // Add safe, URL encoded search parameter if there is a search term
        const options = term ?
        { params: new HttpParams().set('name', term) } : {};

        return this._htc.get<CorporateSupplier[]>(this.apiUrl+'supplier/supplier/', options)
          .pipe(
            catchError(this.handleError<CorporateSupplier[]>('searchHeroes', []))
          );
     
    }
    getCoorporateSupplier1(id:number){
      return this.http.get(this.apiUrl+'supplier/supplier/'+id)
      .map(res=> res.json());       
    }
    addPurchaseRequest1(info){
      return this.http.post(this.apiUrl+'purchase-request',info)
            .map(res=> res.json());
    }
      //////// Save methods //////////

  /** POST: add a new hero to the database */
  addPurchaseRequest2(info): Observable<PurchaseRequest> {
  // let param = {'purchaserequest': request};
  // let body = JSON.stringify(param);
  
    console.log('Para:', info);
    return this._htc.post<PurchaseRequest>(this.apiUrl+'purchase-request', info, httpOptions)
      .pipe(
        catchError(this.handleError('purchaserequest', info))
      );
     
  }
  addPurchaseRequest(info): Observable<PurchaseRequest> {
    console.log(info);
    return this._htc.post<PurchaseRequest>(this.apiUrl+"purchase-request/create", JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError('purchaserequest', info))
    )
  }
  addPurchaseOrder(info): Observable<PurchaseOrder> {
    console.log(info);
    return this._htc.post<PurchaseOrder>(this.apiUrl+"purchase-order/create", JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError('PurchaseOrder', info))
    )
  }
  addPurchasePayment(info): Observable<Payment> {
    console.log(info);
    return this._htc.post<Payment>(this.apiUrl+"payment/create", JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError('Purchase Payment', info))
    )
  }

  addPurchaseOrder2(order: PurchaseOrder, detail:any[]){
    //console.log('sc', salesContract);
    return this._htc.post(this.apiUrl+"purchase-order",
    {
      "purchaseorder": order,
      "orderdetails": detail,
     
    })
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
        },
        error => {
            console.log("Error", error);
        }
    );      
  }
 

    addPurchaseOrder1(info){
      return this.http.post(this.apiUrl+'purchase-order',info)
            .map(res=> res.json());
    }
    addSalesContract(info){
      return this.http.post(this.apiUrl+'sales-contract' , info)
      .map((response: Response) =>  response)
      .catch(this.handleErrors);
     /* return this.http.post('http://localhost/project/erp/server/backend/web/sales-contract',info)
            .map(res=> res.json());*/
    }
    addBillOfEntry(info){
      return this.http.post(this.apiUrl+'bill-of-entry',info)
            .map(res=> res.json());
    }
  
    addWitness (witness: Witness): Observable<Witness> {
      return this._htc.post<Witness>(this.apiUrl+'witness', witness, httpOptions)
      .pipe(
        tap((witness: Witness) => console.log(`added witness w/ witnessID=${witness.personID}`)),
    //    catchError(this.handleError<Witness>('addWitness'))
      );
    }
  
   
    getPurchaseRequest():Observable<PurchaseRequest[]>{
     
      return this._htc.get<PurchaseRequest[]>(this.apiUrl+'purchase-request')
       .pipe(
         tap(data => console.log("Corporate Data:", data)),        
       ); 
    
     }
     
     getSupplierBalance(id):Observable<any>{
      
      return this._htc.post<any>(this.apiUrl+'supplier/'+id,{id:id}, httpOptions)
       .pipe(
         catchError(this.handleErrors),
         tap(data => console.log("Balance:", data)),        
       ); 
    
     }
  
     getPurchaseRequestByStatus(status: string):Observable<PurchaseRequest[]>{
      
       return this._htc.get<PurchaseRequest[]>(this.apiUrl+'purchase-request/findbystatus/'+status, httpOptions)
        .pipe(
          catchError(this.handleErrors),
          tap(data => console.log("Purchase Request:", data)),        
        ); 
     
      }

    getLocalSupplier():Observable<Supplier[]>{
        return this._htc.get<Supplier[]>(this.apiUrl+'supplier', httpOptions)
         .pipe(
           catchError(this.handleErrors),
           tap(data => console.log("Corporate Data:", data)),        
         ); 
      
       }
    getPurchaseRequestByStatus1(name){
      return this.http.get(this.apiUrl+'purchase-request/'+name)
             .map(res=> res.json()); 
    }
    getPurchaseRequestCart(){
      return this.http.get(this.apiUrl+'purchase-request-cart')
              .map(res=> res.json());
    }
    getCartByRequestID(id:number){
      return this.http.get(this.apiUrl+'purchase-request-cart/'+id)
      .map(res=> res.json());       
    }
    getLocalSupplier1(){
      return this.http.get(this.apiUrl+'local')
              .map(res=> res.json());
    }
    
     
    addQutation(info){
      return this.http.post(this.apiUrl+'qutation',info)
            .map(res=> res.json());
    }
    addLC(info){
      return this.http.post(this.apiUrl+'letter-credit',info)
            .map(res=> res.json());
    }
   
    deletePerson(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
    updatePerson(id, info){
      return this.http.put(this.apiUrl+'person/'+id, info)
          .map(res => res.json());
  }

  private handleErrors(error: any) {
    console.error('An error occurred');
    return Promise.reject(error.message || error);
    }	
  
}
