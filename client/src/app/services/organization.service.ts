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
export class OrganizationService {
  private apiUrl = 'http://localhost:1337/api/';
 // private apiUrl= 'http://localhost/project/erp/server/backend/web/';
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
  getPartners (): Observable<Partners[]> {
  
    return this._htc.get<Partners[]>(this.apiUrl+'partners', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Partners:", data)),        
    );
  }
  
 getDepartments (): Observable<Department[]> {
  
  return this._htc.get<Department[]>(this.apiUrl+'department', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("Departments:", data)),        
  );
}
/*               Using Promise      */ 
getAllDepartment(): Promise<any> {
  return new Promise((resolve, reject) => {
    return this._htc.get(this.apiUrl+'department',httpOptions).toPromise().then(response => {
      resolve(response);
    }).catch(() => reject());
  });
}
getFactories (): Observable<Factory[]> {
  
  return this._htc.get<Factory[]>(this.apiUrl+'factory', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("Factory:", data)),        
  );
}
getWarehouse (): Observable<Warehouse[]> {
  
  return this._htc.get<Warehouse[]>(this.apiUrl+'warehouse', httpOptions)
  .pipe(
   catchError(this.handleError),
   tap(data => console.log("Warehouses:", data)),        
  );
}


private handleError(error: any) {
console.error('An error occurred');
return Promise.reject(error.message || error);
}	

getOrganization():Observable<Organization[]>{
    
    return this._htc.get<Organization[]>(this.apiUrl+'organization', httpOptions)
    .pipe(
      tap(data => console.log("Organization :", data)),        
    );       
    
  }
getBranch():Observable<Branch[]>{
    
    return this._htc.get<Branch[]>(this.apiUrl+'branch')
    .pipe(
      tap(data => console.log("Tset Daten:", data)),        
    );       
    
  }
  getDepartment():Observable<Department[]>{   
    return this._htc.get<Department[]>('http://localhost/project/erp/server/backend/web/department')
    .pipe(
      tap(data => console.log("Anlagenstatus Daten:", data)),        
    );       
    
  }

  
  
  getFactory():Observable<Factory[]>{
    return this._htc.get<Factory[]>(this.apiUrl+'factory')
    .pipe(
      tap(data => console.log("Anlagenstatus Daten:", data)),        
    );       
    
  }
  getWarehouse1():Observable<Warehouse[]>{
    return this._htc.get<Warehouse[]>(this.apiUrl+'warehouse')
    .pipe(
      tap(data => console.log("Anlagenstatus Daten:", data)),        
    );       
    
  }

  addOrganization(info): Observable<Organization> {
    console.log(info);
    return this._htc.post<Organization>(this.apiUrl+'organization/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  setupBusiness(info): Observable<Organization> {
    console.log(info);
    return this._htc.post<Organization>(this.apiUrl+'organization/setup-business', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  addBranch(info): Observable<Branch> {
    console.log(info);
    return this._htc.post<Branch>(this.apiUrl+'branch/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  addDepartment(info): Observable<Department> {
    console.log(info);
    return this._htc.post<Department>(this.apiUrl+'department/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  addFactory(info): Observable<Factory> {
    console.log(info);
    return this._htc.post<Factory>(this.apiUrl+'factory/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addWarehouse(info): Observable<Warehouse> {
    console.log(info);
    return this._htc.post<Warehouse>(this.apiUrl+'warehouse/create', JSON.stringify(info), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  addOrganization2(organization: Organization){
    //console.log('sc', transaction);
    return this._htc.post(this.apiUrl+"organization/create",
    {
      "organization": organization,
  
    },
    httpOptions)
    .subscribe(
        data => {
            console.log("Record saved successfuly ", data);
        },
        error => {
            console.log("Error", error);
        }
    );      
  }

   addOrgnization2(info){
      return this.http.post(this.apiUrl+'organization',info)
            .map(res=> res.json());
    }
    addBranch2(info){

      return this.http.post('http://localhost:1337/api/branch', httpOptions ,info)
            .map(res=> res.json());
    }
    addFactory2(info){
      return this.http.post(this.apiUrl+'factory',info)
            .map(res=> res.json());
    }
    addWarehouse2(info){
      return this.http.post(this.apiUrl+'warehouse',info)
            .map(res=> res.json());
    }
    addDepartment2(info){
      return this.http.post(this.apiUrl+'department',info)
            .map(res=> res.json());
    }

    getOrganizationById2(id){
      return this.http
        .post(this.apiUrl+'organization/find/'+id, httpOptions)
        .map(res => res.json().data)
        .subscribe(
            data => { },
            err => { console.error('An error occurred', err) }
        );
    }
    getOrganizationById(id) {
      
      return this._htc.post<Organization[]>(this.apiUrl+'organization/find/'+id, {id:id}, httpOptions)
      .pipe(
        tap(data => console.log("Branch:", data)),        
      );     
      
    }
  
    getBranchById(id)
    {
      
       return this.http.get(this.apiUrl+'branch/'+id)
                .map(res=> res.json());
      
    }
    getBranchEmployees(id)
    {
      
       return this.http.get(this.apiUrl+'branch/employees/'+id)
                .map(res=> res.json());
      
    }
    getFactoryById(id)
    {
      
       return this.http.get(this.apiUrl+'factory/'+id)
                .map(res=> res.json());
      
    }
    getDepartmentById(id)
    {
      
       return this.http.get(this.apiUrl+'department/'+id)
                .map(res=> res.json());
      
    }
    getWarehouseById(id)
    {
      
       return this.http.get(this.apiUrl+'warehouse/'+id)
                .map(res=> res.json());
      
    }
    
   
    getOrderById(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }
    getOrder(){
      return this.http.get(this.apiUrl+'organization')
              .map(res=> res.json());
    }
    deletePerson(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
    updatePerson(id, info){
      return this.http.put(this.apiUrl+'organization/'+id, info)
          .map(res => res.json());
  }


}
