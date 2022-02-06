import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationService  } from '../services/organization.service';
import {  Partners} from '../organizations/organization';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {
  private partner: Observable<Partners[]>;
  
  constructor( public service:OrganizationService,
               public route:ActivatedRoute, 
               public router:Router, 
 ) { }

  ngOnInit() {
    this.getPartners();
  }
  getPartners(): void {    
    this.service.getPartners ().subscribe(partners => {
      this.partner = partners['partners'];
      console.log(this.partner);  
    });
  }
  
}
