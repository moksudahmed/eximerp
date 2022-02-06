import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { Customer } from '../sales/sales';
@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.scss']
})
export class ClientdetailsComponent implements OnInit {
  @Input() c: Customer;
  constructor() { }

  ngOnInit() {
  }

}
