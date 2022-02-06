import { Component, OnInit } from '@angular/core';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { concatAll } from 'rxjs/operators';


@Component({
  selector: 'app-profile-step1',
  templateUrl: './profile-step1.component.html',
  styleUrls: ['./profile-step1.component.scss']
})
export class ProfileStep1Component implements OnInit {
  private model : Organization;  
  
  submitted = false;
  param: any;
  constructor(public service:OrganizationService, public route:ActivatedRoute, public router:Router) 
  { }

 onSubmit({ value, valid}: { value: Organization, valid: boolean }) {
    this.model = value;
    this.submitted = true;
    this.service.addOrganization(this.model)                
    .subscribe(()=> this.goBack())
    alert("Profile has been submitted sucessully!")
    this.model = new Organization();  
  }

  newModel(){
    this.model = new Organization();
  }

  ngOnInit() {
    this.model = new Organization();
    this.model.startedAt = new Date();
  }
  goBack(){
  }
}
