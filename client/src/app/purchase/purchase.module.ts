import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { FormsModule } from '@angular/forms';
// Modal Component

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { PurchaseService  } from '../services/purchase.service';
import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PurchaseRoutingModule } from './purchase-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { BsModalService } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PurchaserequestComponent } from './purchaserequest.component';
import { QutationComponent } from './qutation.component';
import { PurchaseorderComponent } from './purchaseorder.component';
import { OrganizationService } from '../services/organization.service';
import { ProductService  } from '../services/product.service';
import { AccountingService } from '../services/accounting.service';
import { ClientService  } from '../services/client.service';
import { LCComponent } from './lc.component';
import { SalescontractComponent } from './salescontract.component';
import { BillofentryComponent } from './billofentry.component';
import { GenerateorderComponent } from './generateorder.component';
import { WitnessComponent } from '../purchase/witness.component';
import { ConfirmDialogComponent } from '../purchase/confirm-dialog.component';
import { MessageService } from '../services/modalwitness.service';
import { SupplierdetailsComponent } from '../purchase/supplierdetails.component';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageServices } from '../services/message.service';
import { LCDialogComponent } from '../purchase/lcdialog.component';
import { SupplierPaymentComponent } from '../purchase/supplier-payment.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { PurchaseFormDataService  } from '../services/purchaseformdata.service';
import { OrderComponent } from '../purchase/order.component';
import { PreviewComponent } from '../purchase/preview.component';
import { InvoiceComponent } from '../purchase/invoice.component';
import { OrderDetailsComponent } from '../purchase/orderdetails.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,      
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgSelectModule,
    ChartsModule,    
    TabsModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
  ],
  declarations: [PurchaseComponent, 
    PurchaserequestComponent, 
    QutationComponent, 
    PurchaseorderComponent, 
    LCComponent, 
    SalescontractComponent, 
    BillofentryComponent, 
    GenerateorderComponent, 
    WitnessComponent, OrderComponent,PreviewComponent,InvoiceComponent,OrderDetailsComponent,
    ConfirmDialogComponent, SupplierdetailsComponent, LCDialogComponent, SupplierPaymentComponent
  ],
  providers: [        
    PurchaseService,
    OrganizationService,
    ProductService,
    AccountingService,
    ClientService,
    BsModalService,
    MessageService,    
    HttpErrorHandler,
    MessageServices,
    PurchaseFormDataService
  //  JournalService,    
  ],
  bootstrap: [WitnessComponent],  
  entryComponents: [
    ConfirmDialogComponent,
    LCDialogComponent
  
  ],
  exports: [    
    WitnessComponent,
    LCDialogComponent    
  ]
})
export class PurchaseModule { }
