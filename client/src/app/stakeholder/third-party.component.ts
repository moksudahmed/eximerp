import { Component, OnInit } from '@angular/core';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { Observable } from 'rxjs/Observable';
import { ClientService  } from '../services/client.service';
import { ThirdPartAgent } from '../purchase/purchase';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.scss']
})
export class ThirdPartyComponent implements OnInit {

  private agents : Observable<ThirdPartAgent[]>;    
  
  constructor(public service:ClientService) { }

  ngOnInit() {
    this.getThirdPartAgent();      
  }

  
  getThirdPartAgent(): void {

    this.service.getThirdPartAgent().subscribe(supplier => {
    this.agents = supplier['agents']; 

  });

  }

}
