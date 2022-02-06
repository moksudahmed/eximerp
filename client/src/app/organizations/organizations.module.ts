import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { FormsModule } from '@angular/forms';
// Modal Component

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SalesService  } from '../services/sales.service';
import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrganizationsRoutingModule } from './organizations-routing.module';

import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { OrganizationComponent } from './organization.component';
import { BranchComponent } from './branch.component';
import { WarehouseComponent } from './warehouse.component';
import { FactoryComponent } from './factory.component';
import { DepartmentComponent } from './department.component';
import { OrganizationService  } from '../services/organization.service';
import { BranchdetailsComponent } from './branchdetails.component';
import { FactorydetailsComponent } from './factorydetails.component';
import { WarehousedetailsComponent } from './warehousedetails.component';
import { DepatmentdetailsComponent } from './depatmentdetails.component';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { ProfileComponent } from './profile.component';
import { PurchaseService } from '../services/purchase.service';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageServices } from '../services/message.service';
import { CreateProfileComponent } from './create-profile.component';
import { CreatePartnerComponent } from './create-partner.component';
import { ClientService  } from '../services/client.service';
import { AddPartnerComponent } from './add-partner.component';
import { ProfileStep1Component } from './profile-step1.component';
import { ProfileStep2Component } from './profile-step2.component';
import { ProfileStep3Component } from './profile-step3.component';
import { PreviewComponent } from './preview.component';
import { ProfileStep4Component } from './profile-step4.component';
import { ProfileFormDataService  } from '../services/profileformdata.service';

@NgModule({
  imports: [
    CommonModule,
    OrganizationsRoutingModule,      
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ChartsModule,
    ModalModule.forRoot(),
    TabsModule
  ],
  declarations: [
    OrganizationsComponent,
    OrganizationComponent, 
    BranchComponent, 
    WarehouseComponent, 
    FactoryComponent, 
    DepartmentComponent, 
    BranchdetailsComponent, 
    FactorydetailsComponent, 
    WarehousedetailsComponent, 
    DepatmentdetailsComponent, 
    ProfileComponent, 
    CreateProfileComponent, 
    CreatePartnerComponent, 
    AddPartnerComponent,
    ProfileStep1Component,
    ProfileStep2Component,
    ProfileStep3Component,
    ProfileStep4Component,
    PreviewComponent
  ],
  providers: [        
    SalesService,
    OrganizationService,
    BsModalService,
    EmployeeService,
    PersonService,
    PurchaseService,
    ClientService,
    HttpErrorHandler,
    MessageServices,
    ProfileFormDataService 
  //  JournalService,    
  ],
})
export class OrganizationsModule { }
