import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';

@Component({
  selector: 'app-factorydetails',
  templateUrl: './factorydetails.component.html',
 // styleUrls: ['./factorydetails.component.scss']
})

export class FactorydetailsComponent implements OnInit {
  factory : Factory;
  constructor(public service:OrganizationService,
              public route:ActivatedRoute,
              public router:Router) { } 

  ngOnInit() {
      this.getFactory();
  }
  getFactory(){
    var id = this.route.snapshot.params['id'];
    this.service.getFactoryById(id)
    .subscribe(factory=>{
      this.factory = factory;
    })
  
  }
  goBack(){
    this.router.navigate(['/home']);
  }
}
