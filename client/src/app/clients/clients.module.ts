import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Components Routing
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { AddclientComponent } from '../clients/addclient.component';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { CustomerComponent } from '../clients/customer.component';
import { SupplierComponent } from '../clients/supplier.component';
import { ClientService  } from '../services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientdetailsComponent } from '../clients/clientdetails.component';  // <-- #1 
import { IndividualSupplierComponent } from '../clients/individualsupplier.component';
import { ClientAccountComponent } from './clientaccount.component';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,  
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // 
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ChartsModule,
    ModalModule.forRoot(),
    TabsModule
  ],

  declarations: [ClientsComponent,ClientAccountComponent, AddclientComponent, CustomerComponent, SupplierComponent, ClientdetailsComponent, IndividualSupplierComponent],

  providers: [    
    SalesService,
    ClientService,
    
  //  JournalService,    
  ],
})
export class ClientsModule { }
