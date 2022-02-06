import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakeholderComponent } from './stakeholder.component';
import { StakeholderRoutingModule } from './stakeholder-routing.module';
import { CustomerComponent } from './customer.component';
import { PartnerComponent } from './partner.component';
import { ThirdPartyComponent } from './third-party.component';
import { SalesService  } from '../services/sales.service';
import { ClientService  } from '../services/client.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SupplierComponent } from './supplier.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    TabsModule,
    StakeholderRoutingModule
  ],
  declarations: [StakeholderComponent, CustomerComponent, PartnerComponent, ThirdPartyComponent, SupplierComponent],

  providers: [    
    SalesService,
    ClientService,
    
  //  JournalService,    
  ],  
},
  )
export class StakeholderModule { }
