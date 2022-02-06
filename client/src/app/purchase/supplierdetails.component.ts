import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { Supplier } from '../purchase/purchase';
import { IndividualSupplier, CorporateSupplier} from '../purchase/purchase';
import { Observable } from 'rxjs/Observable';
import { PurchaseService } from '../services/purchase.service';
@Component({
  selector: 'app-supplierdetails',
  templateUrl: './supplierdetails.component.html',
  styleUrls: ['./supplierdetails.component.scss']
})
export class SupplierdetailsComponent implements OnInit {
  @Input() s: Supplier;
   val: string;
  constructor() { }

  ngOnInit() {
    this.val = "Tetst";
    
  }
}



