import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
// Modal Component
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { PayrollService  } from '../services/payroll.service';
import { SalaryProfileService } from '../services/salaryprofile.service';
import { SalesService  } from '../services/sales.service';
import { PaymentService } from '../services/payment.service';
import { ProductService  } from '../services/product.service';
import { ClientService  } from '../services/client.service';

import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { PosComponent } from './pos.component';
import { SelectboxPipe } from './selectbox.pipe';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OrdersComponent } from './orders.component';
import { OrderdetailsComponent } from './orderdetails.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaymentComponent } from './payment.component';
import { ClientComponent } from './client.component';
import { PaymentdetailsComponent } from './paymentdetails.component';
import { InvoiceComponent } from './invoice.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    SalesRoutingModule,  
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ChartsModule,
    NgSelectModule,
    ModalModule.forRoot()
  ],
  declarations: [  
    SalesComponent, PosComponent, SelectboxPipe, OrdersComponent, OrderdetailsComponent, PaymentComponent, ClientComponent,
     PaymentdetailsComponent,InvoiceComponent
  ],
  exports: [   
    SelectboxPipe
  ],
  providers: [    
    EmployeeService,    
    PersonService,
    PayrollService,
    SalaryProfileService,
    SalesService,
    PaymentService,
    ProductService,
    BsModalService,
    ClientService
  //  JournalService,    
  ],
  
})
export class SalesModule { }
