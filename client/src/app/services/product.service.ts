import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item, Properties, Category, Stock, StockLevel, _StockLevel } from '../products/item';
import {Http} from "@angular/http";
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';
import {  HttpParams } from '@angular/common/http';
import { Order } from '../sales/sales';
import { PurchaseOrder, PurchaseRequest, PurchaseRequestCart, Qutation, LC, SalesContract, CorporateSupplier, Witness, _Witness, Supplier, BillOfEntry, IndividualSupplier } from '../purchase/purchase';
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
export class ProductService {
  private apiUrl= 'http://localhost:1337/api/';

  results: Item[];
  loading: boolean;


  constructor(private http:Http, private _htc:HttpClient) {
    this.results = [];
    this.loading = false;
   }  

  getProduct(): Observable<Item[]> {  
    return this._htc.get<Item[]>(this.apiUrl+'item', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Items:", data)),        
    );
  }    
/*               Using Promise      */ 
getItem(): Promise<any> {
  return new Promise((resolve, reject) => {
    return this._htc.get(this.apiUrl+'allitem',httpOptions).toPromise().then(response => {
      resolve(response);
    }).catch(() => reject());
  });
}

getAllDepartment(): Promise<any> {
  return new Promise((resolve, reject) => {
    return this._htc.get(this.apiUrl+'department',httpOptions).toPromise()
    .then(response => {
      resolve(response);
      console.log(response);
    }).catch(() => reject());
  });
}   
search(term: string) {
  let promise = new Promise((resolve, reject) => {
    let apiURL = `${this.apiUrl+'item/findbyterm'}?term=${term}&limit=20`; //&media=music
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


  addProduct(item: Item){
    return this._htc.post(this.apiUrl+"item/create",
    {
      "item": item,
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
  
  addCategory(info): Observable<Category> {
    console.log(info);
    return this._htc.post<Category>(this.apiUrl+'category/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCategories(): Observable<Category[]> {  
    return this._htc.get<Category[]>(this.apiUrl+'category', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Category:", data)),        
    );
  }

  
 getStock(): Observable<Stock[]> {  
    return this._htc.get<Stock[]>(this.apiUrl+'stock', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Stock:", data)),        
    );
  }

  getStockLevelById(id): Observable<_StockLevel[]> {  
    return this._htc.get<_StockLevel[]>(this.apiUrl+'stock-balance/'+id, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Stocklevel:", data)),        
    );
  }
  getStockLevelById1(id:number): Observable<_StockLevel[]> {  
    return this._htc.post<_StockLevel[]>(this.apiUrl+'stock-balance/' +id,{id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Stocklevel:", data)),        
    );
  }
  
  getStockLevelById2(id): Observable<_StockLevel[]> {
    return this._htc.post<_StockLevel[]>(this.apiUrl+'stock-balance/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Stocklevel:", data)),        
    );
  }

  addStock(info): Observable<StockLevel> {
    console.log(info);
    return this._htc.post<StockLevel>(this.apiUrl+"stock-level/create", JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  
  getData(id:number):Observable<Item[]>{
    return this.http.get("http://localhost/project/erp/server/backend/web/item/"+id).map(r => <Item[]>r.json());
  }
  /*getItem():Observable<Item[]>{
    return this._htc.get<Item[]>('http://localhost/project/erp/server/backend/web/item')
       .pipe(
         tap(data => console.log("Item Data:", data)),        
       );     
  }*/
  getAllData(id:number):Observable<Item[]>{
    return this._htc.get<Item[]>("http://localhost/project/erp/server/backend/web/item/"+id);
  }
  getProduct2(){
    return this.http.get('http://localhost/project/erp/server/backend/web/item')
            .map(res=> res.json());
  }
  addProduct2(info){
    return this.http.post('http://localhost/project/erp/server/backend/web/item',info)
          .map(res=> res.json());
  }
  addCategory2(info){
    return this.http.post('http://localhost/project/erp/server/backend/web/category',info)
          .map(res=> res.json());
  }
  getCategory(id:number):Observable<Category[]>{
    return this._htc.get<Category[]>("http://localhost/project/erp/server/backend/web/category/"+id);
  }
  getCategories2(){
    return this.http.get('http://localhost/project/erp/server/backend/web/category')
            .map(res=> res.json());
  }
  
  getStockLevel(id:number):Observable<Stock[]>{
    return this.http.get("http://localhost/project/erp/server/backend/web/stocklevel/"+id).map(r => <Stock[]>r.json());
    
//    return this._htc.get<Stock[]>("http://localhost/project/erp/server/backend/web/stocklevel/"+id);
  }
  getStock2(){
    return this.http.get('http://localhost/project/erp/server/backend/web/stocklevel')
            .map(res=> res.json());
  }
  addStock2(info){
    return this.http.post('http://localhost/project/erp/server/backend/web/stocklevel',info)
          .map(res=> res.json());
  }
  // getStockById(id:number):Observable<StockLevel[]>{
  //   return this.http.get("http://localhost/project/erp/server/backend/web/stocklevel/"+id).map(r => <StockLevel[]>r.json());
  // }

  private handleError(error: any) {
    console.error('An error occurred');
    return Promise.reject(error.message || error);
    }	
}