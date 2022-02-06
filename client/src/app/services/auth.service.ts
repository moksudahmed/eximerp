import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

   
const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token'),

  })
};

@Injectable()
export class AuthService {
  private apiUrl= 'http://localhost:1337/user/login';

  //private apiUrl= 'http://localhost:3000/api/auth/signin';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    //console.log(password);            
    return this.http.post<{userName:string, token: string}>(this.apiUrl, {email: username, password: password})
      .pipe(
        retry(1),
        catchError(this.handleError),
        map(result => {
          console.log(result);            
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('currentUser', result.userName);
          return true;
        }),
        
      );
  }

  initialSettings(username: string): Observable<boolean> {
    //console.log(password);            
    return this.http.post<{ branchid:string, personid:string, branchname:string, organizationid: string, organizationname: string}>('http://localhost:1337/api/user/initial-value/', {username: username}, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError),
        map(result => {
          localStorage.setItem('branchName', result['user'][0].branchname);
          localStorage.setItem('branchID', result['user'][0].branchid);          
          localStorage.setItem('orgnizationID', result['user'][0].organizationid);
          return true;
        }),
        
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    localStorage.removeItem('currentUser');
    return (localStorage.getItem('access_token') !== null);
  }
  public get currentUserValue(){
    return (localStorage.getItem('currentUser') !== null);
}

// Error handling 
handleError(error) {
  let errorMessage = '';
  
  if(error.error instanceof ErrorEvent) {
  // Get client-side error
  errorMessage = error.error.message;
  } else {
  // Get server-side error
  //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  if (error.status == 404){
        errorMessage = "User not found, please sign up.";
      }
  else if (error.status == 401){
        errorMessage = "Invalid Password!";
      }  
    else{
      errorMessage = "Server Error";
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  }
  //window.alert(errorMessage);
 
  return throwError(errorMessage);
  }
  
}
