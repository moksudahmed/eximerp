import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Payment, PaymentDue } from '../sales/sales';
import {Http} from "@angular/http";

@Injectable()
export class PaymentService {
  constructor(private _http:Http, private _htc:HttpClient) { }
  getData(id:number):Observable<PaymentDue[]>{
    return this._http.get("http://localhost/project/erp/server/backend/web/payment/"+id).map(r => <PaymentDue[]>r.json());
  }
  getAllData(id:number):Observable<PaymentDue[]>{
    return this._htc.get<PaymentDue[]>("http://localhost/project/erp/server/backend/web/payment/"+id);
  }
  
}