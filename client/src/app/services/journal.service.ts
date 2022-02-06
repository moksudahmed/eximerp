  import { Injectable } from '@angular/core';
  
  import { Http, Response } from '@angular/http';
  import "rxjs/add/operator/map";
  
  @Injectable()
  export class JournalService {
  
    private apiUrl= 'http://localhost/project/erp/server/backend/web/journal/';
    constructor(private http:Http) { }
    
      get(page = 1){
        let url ='http://localhost/project/erp/server/backend/web/journal';
        return this.http.get(url).map(data=>data.json());
      }
    
      addJournal(info){      
        return this.http.post('http://localhost/project/erp/server/backend/web/journal',info)
              .map(res=> res.json());
      }
      getJournal(){
        return this.http.get('http://localhost/project/erp/server/backend/web/journal')
                .map(res=> res.json());
      }
      deleteJournal(id){
        return this.http.delete(this.apiUrl+id)
            .map(res => res.json());
    }
      updateJournal(id, info){
        return this.http.put('http://localhost/project/erp/server/backend/web/journal/'+id, info)
            .map(res => res.json());
    }
  
  }
  