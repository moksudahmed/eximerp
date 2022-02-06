import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Injectable()
export class SalaryProfileService {
  private apiUrl= 'http://localhost/project/erp/server/backend/web/person/';
  constructor(private http:Http) { }    
    getPerson(){
      return this.http.get('http://localhost/project/erp/server/backend/web/person')
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

  }
