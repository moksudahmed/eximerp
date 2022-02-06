import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router,  NavigationExtras,ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 // styleUrls: ['./login.component.css'],
  providers: [DataService]
})

export class LoginComponent implements OnInit {
  @ViewChild('username') el:ElementRef;
  statuslogin:any;
  focusin: boolean = true;
  rForm: FormGroup;
  post:any;  
  usernameAlert:string="Please fill username";
  passwordAlert:string="Please fill password";
  loginAlert:string;
  loginError:boolean=false;
  returnUrl: string;
  constructor(
       private route: ActivatedRoute,
      private fb: FormBuilder,
      private authenticationservice:DataService,    
      public router: Router
    ) {
    this.rForm = fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
   }
   ngOnInit() {
    this.authenticationservice.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index';
}

  addPost(post) {
   this.authenticationservice.login(post).subscribe(
      res => {
        if(res.status == true)
          {
            localStorage.setItem('branch', JSON.stringify(1));
             this.router.navigate([this.returnUrl]);
          }else{
            this.loginError = true
            this.loginAlert = res.message;
          }
      },
       err => {
        return err;
          
      }
    );

  }

}
