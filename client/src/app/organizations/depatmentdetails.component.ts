import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Organization, Branch, Department, Factory, Warehouse} from './organization';
import { OrganizationService  } from '../services/organization.service';

@Component({
  selector: 'app-depatmentdetails',
  templateUrl: './depatmentdetails.component.html',
//  styleUrls: ['./depatmentdetails.component.scss']
})
export class DepatmentdetailsComponent implements OnInit {
  model : Department;
  constructor(public service:OrganizationService,
              public route:ActivatedRoute,
              public router:Router) { } 

  ngOnInit() {
      this.getdepartment();
  }
  getdepartment(){
    var id = this.route.snapshot.params['id'];
    this.service.getDepartmentById(id)
    .subscribe(model=>{
      this.model = model;
    })
  
  }
  goBack(){
    this.router.navigate(['/home']);
  }
}
