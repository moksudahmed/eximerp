import { Component, OnInit } from '@angular/core';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { concatAll } from 'rxjs/operators';
import { ProfileFormDataService  } from '../services/profileformdata.service';

@Component({
  selector: 'app-profile-step2',
  templateUrl: './profile-step2.component.html',
  styleUrls: ['./profile-step2.component.scss']
})
export class ProfileStep2Component implements OnInit {
  private model : Organization;  
  
  submitted = false;
  param: any;
  constructor(public service:OrganizationService, 
            public route:ActivatedRoute, 
            public router:Router,
            private formDataService:ProfileFormDataService) 
            {
              this.model = formDataService.organization;
            }

 onSubmit({ value, valid}: { value: Organization, valid: boolean }) {
    this.model = value;
    this.submitted = true;
   // this.service.addOrganization(this.model)                
   // .subscribe(()=> this.goBack())
    
   // this.model = new Organization();  
    console.log("Model",this.model);
    this.formDataService.postData();
    alert("Profile has been submitted sucessully!")
  }

  newModel(){
    //this.model = new Organization();
  }

  ngOnInit() {
 //   this.model = new Organization();
    this.model.startedAt = new Date();
  }
  goBack(){
  }
}
