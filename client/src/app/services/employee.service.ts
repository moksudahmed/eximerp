import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Employee, VWEmployee, Person, Client, Address, AcademicHistory, EmploymentHistory, SalaryProfile } from '../payrolls/employee';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { ChartOfAccount, Transaction } from '../accountings/accounting';
import { retry} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};

@Injectable()
export class EmployeeService {
  private apiUrl= 'http://localhost:1337/api/';
  constructor(private http:Http, private _htc:HttpClient) { }

  getEmployee(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }
  getEmployees (): Observable<Employee[]> {
      return this._htc.get<Employee[]>(this.apiUrl+'employee', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Employees:", data)),        
      );
    }
  getEmployeesRecord (): Observable<VWEmployee[]> {
      return this._htc.get<VWEmployee[]>(this.apiUrl+'allemployee', httpOptions)
      .pipe(
       catchError(this.handleError),
       tap(data => console.log("Employees:", data)),        
      );
    }
  addEmployee(info): Observable<Employee> {
      console.log(info);
      return this._htc.post<Employee>(this.apiUrl+'employee/create', JSON.stringify(info), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    
    _getEmployees(){
      return this.http.get('http://localhost/project/erp/server/backend/web/employee')
              .map(res=> res.json());
    }
    getAllSalaryProfile(){
      return this.http.get('http://localhost/project/erp/server/backend/web/salaryprofile')
              .map(res=> res.json());
    }
    getSalaryProfile(id){
      return this.http.get('http://localhost/project/erp/server/backend/web/salaryprofile/'+id)
              .map(res=> res.json());
    }
    getMonthlySalary(){
      return this.http.get('http://localhost/project/erp/server/backend/web/salaryprofile/monthly')
              .map(res=> res.json());
    }
    addEmoloyee(info){
      return this.http.post('http://localhost/project/erp/server/backend/web/employee',info)
            .map(res=> res.json());
    }
    deleteEmployee(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
    updateEmployee(id, info){
      return this.http.put('http://localhost/project/erp/server/backend/web/employee/'+id, info)
          .map(res => res.json());
  }

  
private handleError(error: any) {
  console.error('An error occurred');
  return Promise.reject(error.message || error);
  }	

  }
