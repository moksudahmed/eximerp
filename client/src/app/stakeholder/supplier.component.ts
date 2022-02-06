import { Component, OnInit } from '@angular/core';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import { ClientService  } from '../services/client.service';
import { CorporateSupplier , IndividualSupplier } from '../purchase/purchase';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  private supplier : Observable<CorporateSupplier[]>;    
  private inidividualSupplier : Observable<IndividualSupplier[]>;    
  
  constructor(public service:ClientService) { }

  ngOnInit() {
    this.getSupplier();      
    this.getIndividualSupplier();
  }

  
  getSupplier(): void {

    this.service.getCorporateSupplier().subscribe(supplier => {
    this.supplier = supplier['supplier']; 

  });

  }

  
  getIndividualSupplier(): void {

    this.service.getIndividualSupplier().subscribe(supplier => {
    this.inidividualSupplier = supplier['supplier']; 

  });
 
}

}
