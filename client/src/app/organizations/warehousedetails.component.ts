import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';

@Component({
  selector: 'app-warehousedetails',
  templateUrl: './warehousedetails.component.html',
//  styleUrls: ['./warehousedetails.component.scss']
})
export class WarehousedetailsComponent implements OnInit {
  model : Warehouse;
  constructor(public service:OrganizationService,
              public route:ActivatedRoute,
              public router:Router) { } 

  ngOnInit() {
      this.getWarehouse();
  }
  getWarehouse(){
    var id = this.route.snapshot.params['id'];
    this.service.getWarehouseById(id)
    .subscribe(model=>{
      this.model = model;
    })
  
  }
  goBack(){
    this.router.navigate(['/home']);
  }
}

