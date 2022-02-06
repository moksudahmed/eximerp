import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';
import { Product, Order, OrderDetails, Customer, Items, Payment, PaymentDue } from '../sales/sales';
import { Person, Client, ContactInfo, Company, ClientAccounts } from '../clients/client';
import { catchError, map, tap } from 'rxjs/operators';
import { retry} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};
@Injectable()
export class SalesService {

  private apiUrl= 'http://localhost:1337/api/';
  constructor(private http:Http, private _htc:HttpClient) { }   
    
  getOrder(): Observable<Order[]> {  
    return this._htc.get<Order[]>(this.apiUrl+'order', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Orders:", data)),        
    );
  } 
  
  getOrderByOrganizations(id): Observable<Order[]> {
    return this._htc.post<Order[]>(this.apiUrl+'order/find-by-organization/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Sales Order:", data)),        
    );
  }
  
  getOrderById(id): Observable<Order[]> {
    return this._htc.post<Order[]>(this.apiUrl+'order/find-by-order-id/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Sales Order:", data)),        
    );
  }
  
  addOrder(info): Observable<Order> {
    console.log(info);
    return this._htc.post<Order>(this.apiUrl+"order/create", JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  
  addOrder1(order: Order, orderDetails:OrderDetails[], payment:Payment){
   //console.log(payment);
   let userID = 1;
   let financialYearId = 1;
   let info = {'branch':1, //localStorage.getItem('branch')},
               'financialYearId':1,
               'userID':1};
    return this._htc.post(this.apiUrl+"order/create",
    {
      "order": order,
      "orderdetails": orderDetails,
      "payment":payment,
      "info":info    
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

  addOrder2(info){
    return this.http.post('http://localhost/project/erp/server/backend/web/order',info)
          .map(res=> res.json());
  }

    getData(id:number):Observable<Order[]>{
      return this.http.get("http://localhost/project/erp/server/backend/web/clientaccount/"+id).map(r => <Order[]>r.json());
    }
    getProduct(){
      return this.http.get('http://localhost/project/erp/server/backend/web/item')
              .map(res=> res.json());
    }
    getClientOrder(){
      return this.http.get('http://localhost/project/erp/server/backend/web/clientaccount/1')
              .map(res=> res.json());
    }
    getClient1(){
      return this.http.get('http://localhost/project/erp/server/backend/web/clientaccount')
              .map(res=> res.json());
    }
    getClient():Observable<ClientAccounts[]>{
      return this._htc.get<ClientAccounts[]>(this.apiUrl+'clientaccount')
      .pipe(
        tap(data => console.log("Anlagenstatus Daten:", data)),        
      );       
    }

    addPayment(info){
      return this.http.post('http://localhost/project/erp/server/backend/web/payment',info)
            .map(res=> res.json());
    }
    getOrderById2(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }

    getPayment(info){
      return this.http.get('http://localhost/project/erp/server/backend/web/payment', info)
              .map(res=> res.json());
    }

    getPaymentDue(id){
      return this.http.get('http://localhost/project/erp/server/backend/web/payment/1')
              .map(res=> res.json());
    }
   /* getOrder(){
      return this.http.get('http://localhost/project/erp/server/backend/web/order')
              .map(res=> res.json());
    }*/
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
