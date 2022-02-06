import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Injectable()
export class PayrollService {
  private apiUrl= 'http://localhost/project/erp/server/backend/web/payroll/';
  constructor(private http:Http) { }
    getPayroll(id){
      return this.http.get(this.apiUrl+id)
              .map(res=> res.json());
    }
    getPayrolls(){
      return this.http.get('http://localhost/project/erp/server/backend/web/payroll')
              .map(res=> res.json());
    }
    addPayroll(info){
      return this.http.post('http://localhost/project/erp/server/backend/web/payroll',info)
            .map(res=> res.json());
    }
    deletePayroll(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
    updatePayroll(id, info){
      return this.http.put('http://localhost/project/erp/server/backend/web/payroll/'+id, info)
          .map(res => res.json());
      }
  getSalaryProfile(name){
    return this.http.get('http://localhost/project/erp/server/backend/web/payroll/'+name)
           .map(res=> res.json()); 
  }
  getMonthlySalaryProfile(){
    return this.http.get('http://localhost/project/erp/server/backend/web/payroll/salaryprofilemonthly')
           .map(res=> res.json()); 
  }
  
  }
