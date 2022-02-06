import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { Organization, Branch, Department, Factory, Warehouse, Partners} from '../organizations/organization';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { retry} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { PurchaseRequest, PurchaseRequestCart } from '../purchase/purchase';
import { Item } from '../products/item';
import { PurchaseService } from '../services/purchase.service';
import { ProductService  } from '../services/product.service';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};

@Injectable()
export class StakeholderService {

  private apiUrl = 'http://localhost:1337/api/';

  constructor(private http:Http, private _htc:HttpClient) { }    
  getTodos() {
    return this._htc.get<Branch[]>('http://localhost:1337/api/branch', httpOptions)
    .pipe(
      tap(data => console.log("Branch:", data)),        
    );     
    //return this._htc.get<Branch[]>('http://localhost:1337/api/branch', httpOptions1);
  }
 
  getBranches (): Observable<Branch[]> {
    return this._htc.get<Branch[]>(this.apiUrl+'branch', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Branches:", data)),        
    );
  }

  getBranchesByOrganizations(id): Observable<Branch[]> {
    return this._htc.post<Branch[]>(this.apiUrl+'branch/find-by-organization/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Branches By Org:", data)),        
    );
  }

  
  getDepartmentsByOrganizations(id): Observable<Department[]> {
    return this._htc.post<Department[]>(this.apiUrl+'department/find-by-organization/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Department By Org:", data)),        
    );
  }

  getFactoryByOrganizations(id): Observable<Factory[]> {
    return this._htc.post<Factory[]>(this.apiUrl+'factory/find-by-organization/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Factory By Org:", data)),        
    );
  }

  
getPartnersByOrganizations(id): Observable<Partners[]> {
    return this._htc.post<Partners[]>(this.apiUrl+'partners/find-by-organization/'+id, {id:id}, httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Partners By Org:", data)),        
    );
  }
 getDepartments (): Observable<Department[]> {
  
  return this._htc.get<Department[]>(this.apiUrl+'department', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("Departments:", data)),        
  );
}



  private handleError(error: any) {
    console.error('An error occurred');
    return Promise.reject(error.message || error);
  }	

}
