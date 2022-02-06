import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Employee, Person, Client, Address, AcademicHistory, EmploymentHistory, SalaryProfile } from '../payrolls/employee';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ChartOfAccount, Transaction } from '../accountings/accounting';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};
@Injectable()
export class PersonService {
  private apiUrl= 'http://localhost:1337/api/';
  constructor(private http:Http, private _htc:HttpClient) { }
  
  getPersons (): Observable<Person[]> {
    return this._htc.get<Person[]>(this.apiUrl+'person', httpOptions)
    .pipe(
     catchError(this.handleError),
     tap(data => console.log("Persons:", data)),        
    );
  }
  _getPerson(){
      return this.http.get('http://localhost/project/erp/server/backend/web/person')
              .map(res=> res.json());
    }
    getClient(){
      return this.http.get('http://localhost/project/erp/server/backend/web/clientaccount')
              .map(res=> res.json());
    }
    getPerson(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }
 
    addPerson(info){
      return this.http.post('http://localhost/project/erp/server/backend/web/person',info)
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
