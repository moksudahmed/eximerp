import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
// Modal Component

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';



import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { PayrollService  } from '../services/payroll.service';
import { SalaryProfileService } from '../services/salaryprofile.service';
import { SalesService  } from '../services/sales.service';
import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CategoryComponent } from './category.component';
import { ProductComponent } from './product.component';
import { ProductService  } from '../services/product.service';
import { StockComponent } from './stock.component';
import { ProductdetailsComponent } from './productdetails.component';
import { StockupdateComponent } from './stockupdate.component';
@NgModule({
  imports: [
    ProductsRoutingModule,  
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ChartsModule,
    ModalModule.forRoot(),
    TabsModule
  ],
  declarations: [  
    ProductsComponent, CategoryComponent, ProductComponent, StockComponent, ProductdetailsComponent, StockupdateComponent, 
  ],
 
  providers: [    
    EmployeeService,    
    PersonService,
    PayrollService,
    SalaryProfileService,
    SalesService,
    BsModalService,
    ProductService
  //  JournalService,    
  ],
  
})
export class ProductsModule { }
